# == Schema Information
#
# Table name: nc_indicators
#
#  id         :bigint(8)        not null, primary key
#  code       :string           not null
#  indicator  :string           not null
#  category   :string
#  unit       :string
#  definition :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

module NationalCircumstance
  class Indicator < ApplicationRecord
    self.table_name = 'nc_indicators'
    validates_presence_of :code, :indicator
  end
end
