module Api
  module V1
    module Ghg
      class ProjectedEmissionValueSerializer < ApplicationSerializer
        attributes :id, :name, :type

        has_many :projected_emission_years,
                 serializer: Api::V1::Ghg::ProjectedEmissionYearSerializer

        def type
          'ProjectedEmissionValue'
        end
      end
    end
  end
end
