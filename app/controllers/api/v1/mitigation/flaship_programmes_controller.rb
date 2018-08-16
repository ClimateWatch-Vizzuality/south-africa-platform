module Api
  module V1
    module Mitigation
      class FlagshipProgrammesController < ApiController
        def index
          values = FlagshipProgramme.all

          render json: values,
                 each_serializer: Api::V1::Mitigation::FlagshipProgrammeSerializer
        end
      end
    end
  end
end
