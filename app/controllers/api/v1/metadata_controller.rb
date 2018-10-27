module Api
  module V1
    class MetadataController < ApiController
      def index
        data_sources = DataSource.all

        respond_to do |format|
          format.json do
            render json: data_sources,
                   each_serializer: Api::V1::DataSourceSerializer
          end
          format.csv do
            send_data projects.to_csv,
                      type: 'text/csv',
                      filename: 'metadata.csv',
                      disposition: 'attachment'
          end
        end
      end
    end
  end
end
