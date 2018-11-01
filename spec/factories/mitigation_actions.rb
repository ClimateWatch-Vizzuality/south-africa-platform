# == Schema Information
#
# Table name: mitigation_actions
#
#  id                           :bigint(8)        not null, primary key
#  actor                        :string
#  cobenefits                   :string
#  estimated_emission_reduction :string
#  ghg                          :string
#  mitigation_type              :string
#  name                         :text
#  objectives                   :text
#  quantified_effect            :boolean
#  status                       :string
#  time_horizon                 :string
#  created_at                   :datetime         not null
#  updated_at                   :datetime         not null
#  mitigation_theme_id          :integer
#
# Indexes
#
#  index_mitigation_actions_on_actor   (actor)
#  index_mitigation_actions_on_ghg     (ghg)
#  index_mitigation_actions_on_status  (status)
#
# Foreign Keys
#
#  fk_rails_...  (mitigation_theme_id => mitigation_themes.id)
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
    sequence(:quantified_effect) { true }

    factory :mitigation_action_complete, class: 'Mitigation::MitigationAction' do
      association :mitigation_theme, factory: :mitigation_theme_complete, strategy: :build
    end
  end
end
