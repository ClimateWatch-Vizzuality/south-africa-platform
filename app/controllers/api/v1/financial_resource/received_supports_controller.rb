module Api
  module V1
    module FinancialResource
      class ReceivedSupportsController < ApiController
        def index
          values = ::FinancialResource::ReceivedSupport.includes(:donor)

          respond_to do |format|
            format.json do
              render json: values,
                     each_serializer: Api::V1::FinancialResource::ReceivedSupportSerializer,
                     meta: ::FinancialResource::Indicator.all.
                       as_json(except: [:id, :created_at, :updated_at])
            end
            format.zip do
              data_sources = DataSource.all
              data_sources = data_sources.where(short_title: sources) if sources

              render zip: {
                'received_supports.csv' =>
                  Api::V1::FinancialResource::ReceivedSupportCSVSerializer.new(values).to_csv,
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
