# == Schema Information
#
# Table name: flagship_programmes
#
#  id                     :bigint(8)        not null, primary key
#  mitigation_category_id :integer
#  title                  :string
#  description            :text
#  position               :integer
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#

module Mitigation
  class FlagshipProgramme < ApplicationRecord
    self.table_name = 'flagship_programmes'
    validates_presence_of :position, :title
    belongs_to :mitigation_categories
  end
end
