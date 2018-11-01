# == Schema Information
#
# Table name: nc_category_years
#
#  id          :bigint(8)        not null, primary key
#  value       :float
#  year        :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  category_id :integer          not null
#
# Foreign Keys
#
#  fk_rails_...  (category_id => nc_categories.id)
#

module NationalCircumstance
  class CategoryYear < ApplicationRecord
    self.table_name = 'nc_category_years'
    include ::GenericToCsv

    validates_presence_of :year, :value
    belongs_to :category
  end
end
