module Api
  module V1
    module Mitigation
      class MitigationThemesController < ApiController
        def index
          values = ::Mitigation::MitigationTheme.all

          respond_to do |format|
            format.json do
              render json: values,
                     each_serializer: Api::V1::Mitigation::MitigationThemeSerializer
            end
            format.csv do
              send_data values.to_csv,
                        type: 'text/csv',
                        filename: 'mitigation_themes.csv',
                        disposition: 'attachment'
            end
          end
        end
      end
    end
  end
end
