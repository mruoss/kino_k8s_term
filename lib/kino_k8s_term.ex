defmodule KinoK8sTerm do
  @moduledoc """
  Documentation for `KinoK8sTerm`.
  """
  use Kino.JS, assets_path: "lib/assets/kino_k8s_term"
  use Kino.JS.Live
  # use Kino.SmartCell, name: "Kubernetes Terminal"

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
    {:ok, assign(ctx, attrs)}
  end

  @impl true
  def handle_connect(ctx) do
    {:ok, %{}, ctx}
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
    broadcast_event(ctx, "open-terminal", nil)
    {:noreply, ctx}
  end

  def handle_info({:stdout, data}, ctx) do
    broadcast_event(ctx, "print-terminal", data)
    {:noreply, ctx}
  end

  def handle_info(:close, ctx) do
    broadcast_event(ctx, "dispose-terminal", nil)
    {:noreply, assign(ctx, term_pid: nil)}
  end

  def handle_info(other_msg, ctx) do
    {:noreply, ctx}
  end

  @impl true
  def handle_event("key", key, ctx) do
    send(ctx.assigns.term_pid, {:stdin, key})
    {:noreply, ctx}
  end
end
