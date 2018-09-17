# == Schema Information
#
# Table name: mitigation_indicators
#
#  id         :bigint(8)        not null, primary key
#  code       :string
#  indicator  :string
#  unit       :string
#  cautions   :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

module Mitigation
  class MitigationIndicator < ApplicationRecord
    validates_presence_of :code, :indicator
  end
end
