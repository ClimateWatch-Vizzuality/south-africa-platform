# == Schema Information
#
# Table name: flagship_themes
#
#  id         :bigint(8)        not null, primary key
#  name       :string           not null
#  position   :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

FactoryBot.define do
  factory :flagship_theme, class: 'Mitigation::FlagshipTheme' do
    sequence(:name) { |n| ('A'..'Z').to_a[n] }
    sequence(:position) { |n| n }
  end
end
