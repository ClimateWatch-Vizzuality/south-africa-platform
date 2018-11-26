module Api
  module V1
    module Mitigation
      class MitigationActionsController < ApiController
        def index
          values = ::Mitigation::MitigationAction.all

          respond_to do |format|
            format.json do
              render json: values,
                     each_serializer: Api::V1::Mitigation::MitigationActionSerializer
            end
            format.csv do
              send_data values.to_csv,
                        type: 'text/csv',
                        filename: 'mitigation_actions.csv',
                        disposition: 'attachment'
            end
          end
        end
      end
    end
  end
end
