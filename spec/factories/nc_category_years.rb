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

FactoryBot.define do
  factory :nc_category_year, class: 'NationalCircumstance::CategoryYear' do
    sequence(:year) { |n| n }
    factory :nc_category_year_complete, class: 'NationalCircumstance::CategoryYear' do
      sequence(:value_int) { |n| n }
      association :category, factory: :nc_category_complete, strategy: :build
    end
  end
end
