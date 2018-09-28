# == Schema Information
#
# Table name: nc_category_years
#
#  id          :bigint(8)        not null, primary key
#  year        :integer          not null
#  category_id :integer          not null
#  value       :float
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

module NationalCircumstance
  class CategoryYear < ApplicationRecord
    self.table_name = 'nc_category_years'
    include ::GenericToCsv

    validates_presence_of :year, :value
    belongs_to :category
  end
end
