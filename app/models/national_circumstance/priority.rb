# == Schema Information
#
# Table name: priorities
#
#  id          :bigint(8)        not null, primary key
#  location_id :integer
#  code        :string
#  value       :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

module NationalCircumstance
  class Priority < ApplicationRecord
    include ::GenericToCsv

    validates_presence_of :value, :code
    belongs_to :location
  end
end
