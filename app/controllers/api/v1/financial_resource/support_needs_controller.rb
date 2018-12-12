module Api
  module V1
    module FinancialResource
      class SupportNeedsController < ApiController
        def index
          values = ::FinancialResource::SupportNeed.all

          respond_to do |format|
            format.json do
              render json: values,
                     each_serializer: Api::V1::FinancialResource::SupportNeedSerializer,
                     meta: ::FinancialResource::Indicator.all.
                       as_json(except: [:id, :created_at, :updated_at])
            end
            format.zip do
              data_sources = DataSource.all
              data_sources = data_sources.where(short_title: sources) if sources

              render zip: {
                'support_needs.csv' => values.to_csv,
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
