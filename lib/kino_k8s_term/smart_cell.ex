defmodule KinoK8sTerm.SmartCell do
  alias KinoK8sTerm.K8sHelpers
  use Kino.JS, assets_path: "lib/assets/smart_cell"
  use Kino.JS.Live
  use Kino.SmartCell, name: "Kubernetes PodExec Terminal"

  @impl true
  def init(attrs, ctx) do
    config_path = attrs["config_path"] || "~/.kube/config"

    {:ok,
     ctx
     |> assign(
       namespaces: [],
       namespace: nil,
       pods: [],
       pod: nil,
       containers: [],
       container: nil,
       contexts: [],
       context: nil,
       skip_tls_verify: false,
       conn: nil,
       config_path: config_path
     )
     |> set_contexts(config_path)}
  end

  @impl true
  def handle_connect(ctx) do
    {:ok, get_js_attrs(ctx), ctx}
  end

  @impl true
  def to_attrs(ctx) do
    Map.take(ctx.assigns, [
      :config_path,
      :context,
      :skip_tls_verify,
      :namespace,
      :pod,
      :container
    ])
  end

  @impl true
  def to_source(attrs) do
    if Enum.any?(
         [:config_path, :context, :skip_tls_verify, :namespace, :pod, :container],
         &is_nil(attrs[&1])
       ) do
      ~s"""
      IO.puts("Connection could not be established.\nPlease configure the connection to the pod and reevaluate the cell.")
      :no_conn
      """
    else
      %{
        config_path: config_path,
        context: context,
        skip_tls_verify: skip_tls_verify,
        namespace: namespace,
        pod: pod,
        container: container
      } = attrs

      quote do
        {:ok, conn} = K8s.Conn.from_file(unquote(config_path), context: unquote(context))

        conn = struct!(conn, insecure_skip_tls_verify: unquote(skip_tls_verify))

        KinoK8sTerm.open(
          conn,
          unquote(namespace),
          unquote(pod),
          container: unquote(container)
        )
      end
      |> Kino.SmartCell.quoted_to_string()
    end
  end

  @impl true
  def handle_event("update_config_path", config_path, ctx) do
    ctx
    |> assign(config_path: config_path)
    |> set_contexts(config_path)
    |> set_conn()
  end

  def handle_event("update_context", context, ctx) do
    ctx
    |> assign(context: context)
    |> set_conn()
  end

  def handle_event("update_skip_tls_verify", skip_tls_verify, ctx) do
    ctx
    |> assign(skip_tls_verify: skip_tls_verify)
    |> set_conn()
  end

  def handle_event("update_namespace", namespace, ctx) do
    {:noreply,
     ctx
     |> assign(namespace: namespace)
     |> set_pods(namespace)
     |> broadcast_update()}
  end

  def handle_event("update_pod", pod, ctx) do
    {:noreply,
     ctx
     |> assign(pod: pod)
     |> set_containers(pod)
     |> broadcast_update()}
  end

  def handle_event("update_container", container, ctx) do
    {:noreply,
     ctx
     |> assign(container: container)
     |> set_containers(container)
     |> broadcast_update()}
  end

  defp broadcast_update(ctx) do
    broadcast_event(ctx, "update", get_js_attrs(ctx))
    ctx
  end

  defp get_js_attrs(ctx) do
    Map.take(ctx.assigns, [
      :namespaces,
      :namespace,
      :pods,
      :pod,
      :containers,
      :container,
      :config_path,
      :contexts,
      :context,
      :skip_tls_verify
    ])
  end

  defp set_contexts(ctx, config_path) do
    with {:ok, config} <- YamlElixir.read_from_file(Path.expand(config_path)) do
      contexts = get_in(config, ["contexts", Access.all(), "name"])

      assign(ctx, contexts: contexts, context: nil)
    else
      _ -> assign(ctx, contexts: [], context: nil)
    end
  end

  defp set_conn(ctx) do
    with {:ok, conn} <-
           get_conn(ctx.assigns.config_path, ctx.assigns.context, ctx.assigns.skip_tls_verify) do
      {:noreply,
       ctx
       |> assign(conn: conn)
       |> set_namespaces(conn)
       |> broadcast_update()}
    else
      _ ->
        {:noreply,
         ctx
         |> assign(conn: nil)
         |> set_namespaces(nil)
         |> broadcast_update()}
    end
  end

  defp get_conn(_, nil, _), do: :not_connected

  defp get_conn(config_path, context, skip_tls_verify) do
    with true <-
           config_path |> Path.expand() |> File.exists?(),
         {:ok, conn} <- K8s.Conn.from_file(config_path, context: context) do
      if skip_tls_verify do
        {:ok, struct!(conn, insecure_skip_tls_verify: skip_tls_verify)}
      else
        {:ok, conn}
      end
    else
      _ -> :not_connected
    end
  end

  defp set_namespaces(ctx, nil), do: assign(ctx, namespaces: [], namespace: nil) |> set_pods(nil)

  defp set_namespaces(ctx, conn) do
    with {:ok, namespaces} <- K8sHelpers.namespaces(conn) do
      namespace = List.first(namespaces)

      ctx
      |> assign(namespaces: namespaces, namespace: namespace)
      |> set_pods(namespace)
    else
      _ -> ctx
    end
  end

  defp set_pods(ctx, nil), do: assign(ctx, pods: [], pod: nil) |> set_containers(nil)

  defp set_pods(ctx, namespace) do
    with {:ok, pods} <- K8sHelpers.pods(ctx.assigns.conn, namespace) do
      pod = List.first(pods)

      ctx
      |> assign(pods: pods, pod: pod)
      |> set_containers(pod)
    else
      _ -> ctx
    end
  end

  defp set_containers(ctx, nil), do: assign(ctx, containers: [], container: nil)

  defp set_containers(ctx, pod) do
    with {:ok, containers} <- K8sHelpers.containers(ctx.assigns.conn, ctx.assigns.namespace, pod) do
      container = List.first(containers)

      assign(ctx, containers: containers, container: container)
    else
      _ -> ctx
    end
  end
end
