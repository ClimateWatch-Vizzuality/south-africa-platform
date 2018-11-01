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

FactoryBot.define do
  factory :nc_category_year, class: 'NationalCircumstance::CategoryYear' do
    sequence(:year) { |n| n }
    factory :nc_category_year_complete, class: 'NationalCircumstance::CategoryYear' do
      sequence(:value) { |n| n }
      association :category, factory: :nc_category_complete, strategy: :build
    end
  end
end
