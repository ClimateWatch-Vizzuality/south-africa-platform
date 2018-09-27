# == Schema Information
#
# Table name: financial_indicators
#
#  id             :bigint(8)        not null, primary key
#  code           :string
#  indicator      :string
#  category       :string
#  indicator_type :string
#  unit           :string
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#

module Api
  module V1
    module NationalCircumstance
      class PrioritySerializer < ApplicationSerializer
        attributes :code, :value

        belongs_to :location,
                   serializer: Locations::LocationNanoSerializer
      end
    end
  end
end
