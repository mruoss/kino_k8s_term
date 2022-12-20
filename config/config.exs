import Config

config :esbuild,
  version: "0.16.9",
  default: [
    args:
      ~w(assets/smart_cell/main.js --target=es2016 --loader:.js=jsx --outdir=lib/assets/smart_cell/)
  ],
  watch: [
    args:
      ~w(assets/smart_cell/main.js --target=es2016 --loader:.js=jsx --outdir=lib/assets/smart_cell/ --sourcemap=inline --watch)
  ]
