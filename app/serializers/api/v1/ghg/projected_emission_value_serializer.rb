module Api
  module V1
    module Ghg
      class ProjectedEmissionValueSerializer < ApplicationSerializer
        attributes :id, :name

        has_many :project_emission_years,
                 serializer: Api::V1::Ghg::ProjectedEmissionYearSerializer
      end
    end
  end
end
