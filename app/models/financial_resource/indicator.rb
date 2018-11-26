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

module FinancialResource
  class Indicator < ApplicationRecord
    self.table_name = 'financial_indicators'
    validates_presence_of :code, :indicator
  end
end
