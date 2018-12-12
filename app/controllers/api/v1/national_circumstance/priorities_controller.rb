module Api
  module V1
    module NationalCircumstance
      class PrioritiesController < ApiController
        def index
          values = ::NationalCircumstance::Priority.includes(:location)
          values = values.where(code: codes) if codes

          respond_to do |format|
            format.json do
              render json: values,
                     each_serializer: Api::V1::NationalCircumstance::PrioritySerializer,
                     meta: ::NationalCircumstance::Indicator.all.
                       as_json(except: %w[id created_at updated_at])
            end
            format.zip do
              data_sources = DataSource.all
              data_sources = data_sources.where(short_title: sources) if sources

              render zip: {
                'priorities.csv' => Api::V1::NationalCircumstance::PriorityCSVSerializer.new(values).to_csv,
                'data_sources.csv' => data_sources.to_csv
              }
            end
          end
        end

        private

        def codes
          return unless sources

          sources.map do |source|
            ::NationalCircumstance::Priority::DATA_SOURCE_TO_CODES_MAP[source]
          end.flatten
        end

        def sources
          params[:sources].presence && params[:sources].split(',')
        end
      end
    end
  end
end
