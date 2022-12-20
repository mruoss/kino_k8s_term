defmodule KinoK8sTerm.Application do
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    Kino.SmartCell.register(KinoK8sTerm.SmartCell)

    Supervisor.start_link([], strategy: :one_for_one, name: KinoDB.Supervisor)
  end
end
