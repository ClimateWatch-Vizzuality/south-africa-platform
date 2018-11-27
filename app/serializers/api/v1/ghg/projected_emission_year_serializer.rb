module Api
  module V1
    module Ghg
      class ProjectedEmissionYearSerializer < ApplicationSerializer
        attributes :year, :value
      end
    end
  end
end
