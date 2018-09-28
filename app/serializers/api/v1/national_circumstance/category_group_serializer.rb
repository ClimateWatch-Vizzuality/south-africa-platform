# == Schema Information
#
# Table name: nc_category_groups
#
#  id         :bigint(8)        not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

module Api
  module V1
    module NationalCircumstance
      class CategoryGroupSerializer < ApplicationSerializer
        attributes :name

        has_many :categories,
                 serializer: NationalCircumstance::CategorySerializer
      end
    end
  end
end
