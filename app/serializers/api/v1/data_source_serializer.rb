module Api
  module V1
    class DataSourceSerializer < ApplicationSerializer
      attributes :short_title, :title, :source_organization,
        :learn_more, :citation
    end
  end
end
