# == Schema Information
#
# Table name: national_circumstance_indicators
#
#  id         :bigint(8)        not null, primary key
#  code       :string
#  indicator  :string
#  category   :string
#  unit       :string
#  definition :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

module NationalCircumstance
  class Indicator < ApplicationRecord
    self.table_name = 'national_circumstance_indicators'
    validates_presence_of :code, :indicator
  end
end
