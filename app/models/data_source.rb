class DataSource < ApplicationRecord
  include ::GenericToCsv

  validates :short_title, presence: true, uniqueness: true
end
