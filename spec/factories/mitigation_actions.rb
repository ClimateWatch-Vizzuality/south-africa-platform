# == Schema Information
#
# Table name: mitigation_actions
#
#  id                           :bigint(8)        not null, primary key
#  mitigation_theme_id          :integer
#  name                         :text
#  objectives                   :text
#  mitigation_type              :string
#  status                       :string
#  actor                        :string
#  time_horizon                 :string
#  ghg                          :string
#  estimated_emission_reduction :string
#  cobenefits                   :string
#  bur1                         :boolean
#  created_at                   :datetime         not null
#  updated_at                   :datetime         not null
#

FactoryBot.define do
  factory :mitigation_action, class: 'Mitigation::MitigationAction' do
    sequence(:name) { |n| ('A'..'Z').to_a[n] }
    sequence(:objectives) { |n| ('AA'..'ZZ').to_a[n] }
    sequence(:mitigation_type) { |n| ('AA'..'ZZ').to_a[n] }
    sequence(:status) { |n| ('AA'..'ZZ').to_a[n] }
    sequence(:actor) { |n| ('AA'..'ZZ').to_a[n] }
    sequence(:time_horizon) { |n| ('AA'..'ZZ').to_a[n] }
    sequence(:ghg) { |n| ('AA'..'ZZ').to_a[n] }
    sequence(:estimated_emission_reduction) { |n| ('AA'..'ZZ').to_a[n] }
    sequence(:cobenefits) { |n| ('AA'..'ZZ').to_a[n] }
    sequence(:bur1) { true }

    factory :mitigation_action_complete, class: 'Mitigation::MitigationAction' do
      association :mitigation_theme, factory: :mitigation_theme_complete, strategy: :build
    end
  end
end
