# == Schema Information
#
# Table name: nc_category_groups
#
#  id         :bigint(8)        not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

FactoryBot.define do
  factory :nc_category_group, class: 'NationalCircumstance::CategoryGroup' do
    sequence(:name) { |n| ('A'..'Z').to_a[n] }
  end
end
