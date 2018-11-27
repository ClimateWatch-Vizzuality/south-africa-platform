# == Schema Information
#
# Table name: nc_category_years
#
#  id          :bigint(8)        not null, primary key
#  year        :integer          not null
#  category_id :integer          not null
#  value_int   :bigint(8)
#  value_float :float
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

module Api
  module V1
    module NationalCircumstance
      class CategoryYearSerializer < ApplicationSerializer
        attributes :id, :year, :value

        belongs_to :category,
                   serializer: NationalCircumstance::CategorySerializer
      end
    end
  end
end
