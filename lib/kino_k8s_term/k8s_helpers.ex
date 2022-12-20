defmodule KinoK8sTerm.K8sHelpers do
  def namespaces(conn) do
    with {:ok, ns_list} <-
           K8s.Client.list("v1", "namespace")
           |> K8s.Client.put_conn(conn)
           |> K8s.Client.run() do
      {:ok, get_in(ns_list, ["items", Access.all(), "metadata", "name"])}
    end
  end

  def pods(conn, namespace) do
    with {:ok, pod_list} <-
           K8s.Client.list("v1", "pod", namespace: namespace)
           |> K8s.Client.put_conn(conn)
           |> K8s.Client.run() do
      {:ok, get_in(pod_list, ["items", Access.all(), "metadata", "name"])}
    end
  end

  def containers(conn, namespace, pod) do
    with {:ok, pod} <-
           K8s.Client.get("v1", "pod", namespace: namespace, name: pod)
           |> K8s.Client.put_conn(conn)
           |> K8s.Client.run() do
      {:ok, get_in(pod, ["spec", "containers", Access.all(), "name"])}
    end
  end

  def open_connection(conn, namespace, pod, container) do
    {:ok, stream} =
      K8s.Client.connect("v1", "pods/exec", [namespace: namespace, name: pod],
        command: ["/bin/bash"],
        container: container,
        tty: true
      )
      |> K8s.Client.put_conn(conn)
      |> K8s.Client.stream()

    stream
  end
end
