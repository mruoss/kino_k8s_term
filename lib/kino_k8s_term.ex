defmodule KinoK8sTerm do
  @moduledoc """
  Documentation for `KinoK8sTerm`.
  """
  use Kino.JS, assets_path: "lib/assets/kino_k8s_term"
  use Kino.JS.Live

  @doc """
  Connects to a Kubernetes Pod and opens a Terminal.

  ### Arguments

  - `conn` - a `%K8s.Conn{}` struct that can be optained by calling `K8s.Conn.from_file/2`
  - `namespace` - The namespace your pod runs in
  - `pod` - The name of your pod

  ### Options

  - `container` - If your pod runs multiple containers, define the container you want to connect to.
  - `command` - optional. The shell that is executed once connected. Defaults to `/bin/sh`.

  ### Example

      {:ok, conn} = K8s.Conn.from_file("~/.kube/config", context: "some_local_cluster")
      # For local clusters, you might want to skip TLS verification
      conn = struct!(conn, insecure_skip_tls_verify: true)

      namespace = "default"
      pod = "nginx-deployment-6595874d85-5kdf4"
      container = "nginx"
      command = "/bin/bash"

      KinoK8sTerm.open(conn, namespace, pod, container: container, command: command)
  """
  def open(conn, namespace, pod, opts \\ []) do
    ctx =
      Kino.JS.Live.new(__MODULE__,
        conn: conn,
        namespace: namespace,
        pod: pod,
        container: Keyword.get(opts, :container),
        command: Keyword.get(opts, :command, "/bin/sh")
      )

    Kino.JS.Live.cast(ctx, :open_terminal)
    ctx
  end

  @impl true
  def init(attrs, ctx) do
    {:ok, assign(ctx, Keyword.put(attrs, :buffer, []))}
  end

  @impl true
  def handle_connect(ctx) do
    buffer = ctx.assigns.buffer |> Enum.reverse() |> IO.iodata_to_binary()
    {:ok, %{buffer: buffer}, ctx}
  end

  @impl true
  def handle_cast(:open_terminal, ctx) do
    {:ok, pid} =
      Kino.start_child(
        {KinoK8sTerm.PodConnector,
         conn: ctx.assigns.conn,
         namespace: ctx.assigns.namespace,
         pod: ctx.assigns.pod,
         container: ctx.assigns.container,
         command: ctx.assigns.command,
         stream_to: self()}
      )

    {:noreply, assign(ctx, term_pid: pid)}
  end

  @impl true
  def handle_info(:open, ctx) do
    {:noreply, ctx}
  end

  def handle_info({:stdout, data}, ctx) do
    broadcast_event(ctx, "print-terminal", data)

    new_buffer =
      case String.split(data, "\n") do
        [chunk] -> [chunk | ctx.assigns.buffer]
        [_ | tail] -> [List.last(tail)]
      end

    {:noreply, assign(ctx, buffer: new_buffer)}
  end

  def handle_info(:close, ctx) do
    broadcast_event(ctx, "dispose-terminal", nil)
    {:noreply, assign(ctx, term_pid: nil, buffer: [])}
  end

  def handle_info(_other_msg, ctx) do
    {:noreply, ctx}
  end

  @impl true
  def handle_event("key", key, ctx) do
    send(ctx.assigns.term_pid, {:stdin, key})
    {:noreply, ctx}
  end
end
