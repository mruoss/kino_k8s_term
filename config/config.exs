import Config

config :esbuild,
  version: "0.16.9",
  default: [
    args:
      ~w(assets/js/main.js --target=es2016 --loader:.js=jsx --outdir=lib/assets/kino_k8s_term/)
  ],
  watch: [
    args:
      ~w(assets/js/main.js --target=es2016 --loader:.js=jsx --outdir=lib/assets/kino_k8s_term/ --sourcemap=inline --watch)
  ]
