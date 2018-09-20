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
            format.csv do
              send_data values.to_csv,
                        type: 'text/csv',
                        filename: 'support_needs.csv',
                        disposition: 'attachment'
            end
          end
        end
      end
    end
  end
end
