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
    module FinancialResource
      class IndicatorSerializer < ApplicationSerializer
        attributes :code, :indicator, :category,
                   :indicator_type, :unit
      end
    end
  end
end
