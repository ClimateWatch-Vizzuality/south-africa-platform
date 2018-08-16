# == Schema Information
#
# Table name: mitigation_categories
#
#  id         :bigint(8)        not null, primary key
#  title      :string
#  position   :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class MitigationCategory < ApplicationRecord
  validates_presence_of :title, :position
  has_many :mitigation_actions
  has_many :flagship_programmes
end
