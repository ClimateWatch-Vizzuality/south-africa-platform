# == Schema Information
#
# Table name: donors
#
#  id          :bigint(8)        not null, primary key
#  name        :string
#  description :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

module FinancialResource
  class Donor < ApplicationRecord
    has_many :received_supports
    validates_presence_of :name
  end
end
