module Api
  module V1
    module Ghg
      class ProjectedEmissionBoundarySerializer < ApplicationSerializer
        attributes :id, :name, :type, :boundary

        has_many :projected_emission_years,
                 serializer: Api::V1::Ghg::ProjectedEmissionYearSerializer

        def type
          'ProjectedEmissionBoundary'
        end
      end
    end
  end
end
