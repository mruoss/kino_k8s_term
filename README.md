# KinoK8sTerm - A Livebook Kino to run a Terminal for Kubernetes Pods

[![Run in Livebook](https://livebook.dev/badge/v1/pink.svg)](https://livebook.dev/run?url=https%3A%2F%2Fgithub.com%2Fmruoss%2Fkino_k8s_term%2Fblob%2Fmain%2FREADME.md)

## About

This Kino uses the Elixir library [k8s](https://github.com/coryodaniel/k8s) to open a connection to a pod and uses [Xterm.js](http://xtermjs.org/) to render a terminal in your livebook. Refer to these projects for inside information.

https://user-images.githubusercontent.com/695307/208457804-614b5a82-9108-4281-b711-df8ac4040be3.mp4

## Installation

This Kino is currently not published on hex.pm. You can use it if you install it
from git:

```elixir
Mix.install([
  {:kino_k8s_term, git: "git@github.com:mruoss/kino_k8s_term.git", branch: "main"}
])
```

## Usage

To open a terminal, call `KinoK8sTerm.open/4`.

### Arguments

- `conn` - a `%K8s.Conn{}` struct that can be optained by calling `K8s.Conn.from_file/2`
- `namespace` - The namespace your pod runs in
- `pod` - The name of your pod

### Options

- `container` - If your pod runs multiple containers, define the container you want to connect to.
- `command` - optional. The shell that is executed once connected. Defaults to `/bin/sh`.

```elixir
{:ok, conn} = K8s.Conn.from_file("~/.kube/config", context: "some_local_cluster")
# For local clusters, you might want to skip TLS verification
conn = struct!(conn, insecure_skip_tls_verify: true)

namespace = "default"
pod = "nginx-deployment-6595874d85-5kdf4"
container = "nginx"
command = "/bin/bash"

KinoK8sTerm.open(conn, namespace, pod, container: container, command: command)
```

## Security

Note that the user defined in the `conn` object needs permissions to the `pods/exec` resource in your cluster. If this is not given, the terminal can't be opened.

Use this Kino for local clusters only. Or protect your livebook well from unwanted access.
