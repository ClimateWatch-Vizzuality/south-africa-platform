# == Schema Information
#
# Table name: inventory_improvement_projects
#
#  id        :bigint(8)        not null, primary key
#  name      :text             not null
#  sector    :text
#  objective :text
#  partner   :text
#  donor     :text
#  outcome   :text
#  status    :text             not null
#  timelines :text
#

module InventoryImprovement
  class Project < ApplicationRecord
    include ::GenericToCsv

    validates :name, presence: true, uniqueness: true
    validates :status, presence: true

    def self.column_headers_override
      {'name' => 'Project'}
    end
  end
end
