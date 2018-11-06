# == Schema Information
#
# Table name: priorities
#
#  id          :bigint(8)        not null, primary key
#  code        :string           not null
#  value       :text             not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  location_id :integer          not null
#
# Foreign Keys
#
#  fk_rails_...  (location_id => locations.id)
#

module NationalCircumstance
  class Priority < ApplicationRecord
    include ::GenericToCsv

    validates_presence_of :value, :code
    belongs_to :location
  end
end
