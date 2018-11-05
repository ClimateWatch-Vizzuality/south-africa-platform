module Api
  module V1
    class SectionContentSerializer < ApplicationSerializer
      attributes :name, :title, :description, :subsections
    end
  end
end
