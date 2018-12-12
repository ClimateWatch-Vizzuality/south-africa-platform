module Api
  module V1
    module Mitigation
      class MitigationEffectsController < ApiController
        def index
          values = ::Mitigation::MitigationEffect.all

          respond_to do |format|
            format.json do
              render json: values,
                     each_serializer: MitigationEffectSerializer,
                     meta: ::Mitigation::MitigationIndicator.all.
                       select(:code, :indicator, :unit, :cautions)
            end
            format.zip do
              data_sources = DataSource.all
              data_sources = data_sources.where(short_title: sources) if sources

              render zip: {
                'mitigation_effects.csv' => values.to_csv,
                'data_sources.csv' => data_sources.to_csv
              }
            end
          end
        end

        private

        def sources
          params[:sources].presence && params[:sources].split(',')
        end
      end
    end
  end
end
