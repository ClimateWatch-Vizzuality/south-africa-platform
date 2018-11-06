# == Schema Information
#
# Table name: flagship_programmes
#
#  id                :bigint(8)        not null, primary key
#  description       :text
#  outcomes          :text
#  position          :integer
#  sub_programs      :text
#  work_package      :text
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  flagship_theme_id :integer
#
# Foreign Keys
#
#  fk_rails_...  (flagship_theme_id => flagship_themes.id)
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
