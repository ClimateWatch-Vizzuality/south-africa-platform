# == Schema Information
#
# Table name: flagship_components
#
#  id                    :bigint(8)        not null, primary key
#  barriers              :text
#  lead                  :string
#  main_activities       :text
#  milestone             :text
#  name                  :string           not null
#  next_steps            :text
#  status                :string
#  support               :text
#  timeframe             :string
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#  flagship_programme_id :integer
#
# Foreign Keys
#
#  fk_rails_...  (flagship_programme_id => flagship_programmes.id)
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
