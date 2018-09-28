# == Schema Information
#
# Table name: nc_category_years
#
#  id          :bigint(8)        not null, primary key
#  year        :integer          not null
#  category_id :integer          not null
#  value_int   :bigint(8)
#  value_float :float
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

module NationalCircumstance
  class CategoryYear < ApplicationRecord
    self.table_name = 'nc_category_years'
    include ::GenericToCsv

    validates_presence_of :year
    validate :value_type
    belongs_to :category
    attr_reader :value

    private

    def value_type
      unless value_int.nil? ^ value_float.nil?
        errors.add(:value_int, 'Value_int OR value_float must exist')
      end
    end

    def value
      value_int || value_float
    end
  end
end
