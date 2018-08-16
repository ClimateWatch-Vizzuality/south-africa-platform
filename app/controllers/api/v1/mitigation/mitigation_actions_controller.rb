module Api
  module V1
    module Mitigation
      class MitigationActionsController < ApiController
        def index
          values = MitigationAction.all

          render json: values,
                 each_serializer: Api::V1::Mitigation::MitigationActionSerializer
        end
      end
    end
  end
end
