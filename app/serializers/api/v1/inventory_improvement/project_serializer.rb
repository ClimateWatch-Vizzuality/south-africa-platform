module Api
  module V1
    module InventoryImprovement
      class ProjectSerializer < ActiveModel::Serializer
        attribute :name, key: :project
        attributes :sector, :objective, :partner, :donor, :outcome, :status, :timelines
      end
    end
  end
end
