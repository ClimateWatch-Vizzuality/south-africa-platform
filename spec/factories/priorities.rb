# == Schema Information
#
# Table name: priorities
#
#  id          :bigint(8)        not null, primary key
#  code        :string           not null
#  value       :text             not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  location_id :integer          not null
#
# Foreign Keys
#
#  fk_rails_...  (location_id => locations.id)
#

FactoryBot.define do
  factory :priority, class: 'NationalCircumstance::Priority' do
    sequence(:code) { |n| ('A'..'Z').to_a[n] }
    sequence(:value) { |n| ('A'..'Z').to_a[n] }

    factory :priority_complete, class: 'NationalCircumstance::Priority' do
      association :location, factory: :location, strategy: :build
    end
  end
end
