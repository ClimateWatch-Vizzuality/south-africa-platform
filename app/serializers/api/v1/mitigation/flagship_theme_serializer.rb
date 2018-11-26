module Api
  module V1
    module Mitigation
      class FlagshipThemeSerializer < ApplicationSerializer
        attributes :id, :name, :position

        has_many :flagship_programmes,
                 serializer: Api::V1::Mitigation::FlagshipProgrammeSerializer
      end
    end
  end
end
