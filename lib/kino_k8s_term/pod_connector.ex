defmodule KinoK8sTerm.PodConnector do
  @spec child_spec(keyword()) :: Supervisor.child_spec()
  def child_spec(args) do
    %{
      id: __MODULE__,
      start: {__MODULE__, :start_link, [args]},
      restart: :transient
    }
  end

  @spec start_link(keyword()) :: {:ok, pid}
  def start_link(args) do
    conn = Keyword.fetch!(args, :conn)
    namespace = Keyword.fetch!(args, :namespace)
    pod = Keyword.fetch!(args, :pod)
    container = Keyword.fetch!(args, :container)
    command = Keyword.fetch!(args, :command)
    stream_to = Keyword.fetch!(args, :stream_to)

    Task.start_link(__MODULE__, :run, [conn, namespace, pod, container, command, stream_to])
  end

  def run(conn, namespace, pod, container, command, stream_to) do
    {:ok, stream} =
      K8s.Client.connect(
        "v1",
        "pods/exec",
        [namespace: namespace, name: pod],
        container: container,
        command: command,
        tty: true
      )
      |> K8s.Client.put_conn(conn)
      |> K8s.Client.stream()

    stream
    |> Stream.map(&send(stream_to, &1))
    |> Stream.run()
  end
end
