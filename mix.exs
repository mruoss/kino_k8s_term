defmodule KinoK8sTerm.MixProject do
  use Mix.Project

  def project do
    [
      app: :kino_k8s_term,
      version: "0.1.0",
      elixir: "~> 1.14",
      start_permanent: Mix.env() == :prod,
      deps: deps()
    ]
  end

  # Run "mix help compile.app" to learn about applications.
  def application do
    [
      mod: {KinoK8sTerm.Application, []},
      extra_applications: [:logger]
    ]
  end

  # Run "mix help deps" to learn about dependencies.
  defp deps do
    [
      {:k8s, "~> 2.0.0"},
      {:esbuild, "~> 0.5", only: :dev},
      {:kino, "~> 0.8.0"}
    ]
  end
end
