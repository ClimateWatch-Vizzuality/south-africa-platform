# == Schema Information
#
# Table name: nc_categories
#
#  id                :bigint(8)        not null, primary key
#  category_group_id :integer          not null
#  location_id       :integer          not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#

module Api
  module V1
    module NationalCircumstance
      class CategorySerializer < ApplicationSerializer
        attributes :code, :value

        belongs_to :category_group,
                   serializer: NationalCircumstance::CategoryGroupSerializer

        belongs_to :location,
                   serializer: Location::LocationSerializer

        has_many :category_years,
                 serializer: NationalCircumstance::CategoryYearSerializer
      end
    end
  end
end
