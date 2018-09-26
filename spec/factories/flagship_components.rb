# == Schema Information
#
# Table name: flagship_components
#
#  id                    :bigint(8)        not null, primary key
#  flagship_programme_id :integer
#  name                  :string           not null
#  main_activities       :text
#  lead                  :string
#  status                :string
#  milestone             :text
#  barriers              :text
#  next_steps            :text
#  timeframe             :string
#  support               :text
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#

FactoryBot.define do
  factory :flagship_component, class: 'Mitigation::FlagshipComponent' do
    sequence(:name) { |n| ('A'..'Z').to_a[n] }
    sequence(:main_activities) { |n| ('A'..'Z').to_a[n] }
    sequence(:lead) { |n| ('A'..'Z').to_a[n] }
    sequence(:status) { |n| ('A'..'Z').to_a[n] }
    sequence(:milestone) { |n| ('A'..'Z').to_a[n] }
    sequence(:barriers) { |n| ('A'..'Z').to_a[n] }
    sequence(:next_steps) { |n| ('A'..'Z').to_a[n] }
    sequence(:timeframe) { |n| ('A'..'Z').to_a[n] }
    sequence(:support) { |n| ('A'..'Z').to_a[n] }
  end
end
