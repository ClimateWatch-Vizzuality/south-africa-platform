# == Schema Information
#
# Table name: flagship_programmes
#
#  id                :bigint(8)        not null, primary key
#  sub_programs      :text
#  description       :text
#  position          :integer
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  work_package      :text
#  outcomes          :text
#  flagship_theme_id :integer
#

module Mitigation
  class FlagshipProgramme < ApplicationRecord
    include ::GenericToCsv

    self.table_name = 'flagship_programmes'
    validates_presence_of :position
    belongs_to :flagship_theme
    has_many :flagship_components
  end
end
