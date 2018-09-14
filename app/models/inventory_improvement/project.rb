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
