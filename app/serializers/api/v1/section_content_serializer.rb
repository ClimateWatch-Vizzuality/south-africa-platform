module Api
  module V1
    class SectionContentSerializer < ApplicationSerializer
      attributes :slug, :title, :description
    end
  end
end
