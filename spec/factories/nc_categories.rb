# == Schema Information
#
# Table name: nc_categories
#
#  id                :bigint(8)        not null, primary key
#  name              :string           not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  category_group_id :integer          not null
#  location_id       :integer          not null
#
# Foreign Keys
#
#  fk_rails_...  (category_group_id => nc_category_groups.id)
#  fk_rails_...  (location_id => locations.id)
#

FactoryBot.define do
  factory :nc_category, class: 'NationalCircumstance::Category' do
    sequence(:name) { |n| ('A'..'Z').to_a[n] }
    factory :nc_category_complete, class: 'NationalCircumstance::Category' do
      association :category_group, factory: :nc_category_group, strategy: :build
      association :location, factory: :location, strategy: :build
    end
  end
end
