# == Schema Information
#
# Table name: mitigation_effects
#
#  id          :bigint(8)        not null, primary key
#  theme       :string
#  name        :string
#  coordinator :string
#  effects_1   :string
#  effects_2   :string
#  effects_3   :string
#  effects_4   :string
#  effects_5   :string
#  effects_6   :string
#  effects_7   :string
#  effects_8   :string
#  effects_9   :string
#  effects_10  :string
#  effects_11  :string
#  effects_12  :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

FactoryBot.define do
  factory :mitigation_effect, class: 'Mitigation::MitigationEffect' do
    sequence(:theme) { |n| ('A'..'Z').to_a[n] }
    sequence(:name) { |n| ('A'..'Z').to_a[n] }
    sequence(:coordinator) { |n| ('A'..'Z').to_a[n] }
    sequence(:effects_1) { |n| ('A'..'Z').to_a[n] }
    sequence(:effects_2) { |n| ('A'..'Z').to_a[n] }
    sequence(:effects_3) { |n| ('A'..'Z').to_a[n] }
    sequence(:effects_4) { |n| ('A'..'Z').to_a[n] }
    sequence(:effects_5) { |n| ('A'..'Z').to_a[n] }
    sequence(:effects_6) { |n| ('A'..'Z').to_a[n] }
    sequence(:effects_7) { |n| ('A'..'Z').to_a[n] }
    sequence(:effects_8) { |n| ('A'..'Z').to_a[n] }
    sequence(:effects_9) { |n| ('A'..'Z').to_a[n] }
    sequence(:effects_10) { |n| ('A'..'Z').to_a[n] }
    sequence(:effects_11) { |n| ('A'..'Z').to_a[n] }
    sequence(:effects_12) { |n| ('A'..'Z').to_a[n] }
  end
end
