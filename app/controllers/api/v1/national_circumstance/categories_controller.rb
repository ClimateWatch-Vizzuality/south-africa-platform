module Api
  module V1
    module NationalCircumstance
      class CategoriesController < ApiController
        def index
          values = ::NationalCircumstance::Category.
            includes(:location, :category_group, :category_years)
          values = values.where(nc_category_groups: {name: group}) if group

          respond_to do |format|
            format.json do
              render json: values,
                     each_serializer: Api::V1::NationalCircumstance::CategorySerializer,
                     meta: ::NationalCircumstance::Indicator.all.
                       as_json(except: %w[id created_at updated_at])
            end
            format.zip do
              data_sources = DataSource.all
              data_sources = data_sources.where(short_title: sources) if sources

              render zip: {
                'values.csv' => Api::V1::NationalCircumstance::CategoryCSVSerializer.new(values).to_csv,
                'data_sources.csv' => data_sources.to_csv
              }, filename: group || 'categories'
            end
          end
        end

        private

        def group
          params[:group]
        end

        def sources
          params[:sources].presence && params[:sources].split(',')
        end
      end
    end
  end
end
