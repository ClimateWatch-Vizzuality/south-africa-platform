module InventoryImprovement
  class Project < ApplicationRecord
    validates :name, presence: true, uniqueness: true
    validates :status, presence: true
  end
end
