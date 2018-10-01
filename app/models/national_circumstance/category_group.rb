# == Schema Information
#
# Table name: nc_category_groups
#
#  id         :bigint(8)        not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

module NationalCircumstance
  class CategoryGroup < ApplicationRecord
    self.table_name = 'nc_category_groups'
    validates_presence_of :name

    has_many :categories
  end
end
