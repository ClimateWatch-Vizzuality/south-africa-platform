module Api
  module V1
    module Mitigation
      class MitigationEffectsController < ApiController
        def index
          values = ::Mitigation::MitigationEffect.all

          respond_to do |format|
            format.json do
              render json: values,
                     each_serializer: Api::V1::Mitigation::MitigationEffectSerializer,
                     meta: ::Mitigation::MitigationIndicator.all.
                       select(:code, :indicator, :unit, :cautions)
            end
            format.csv do
              send_data values.to_csv,
                        type: 'text/csv',
                        filename: 'mitigation_effects.csv',
                        disposition: 'attachment'
            end
          end
        end
      end
    end
  end
end
