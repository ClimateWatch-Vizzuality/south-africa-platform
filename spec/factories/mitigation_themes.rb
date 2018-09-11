# == Schema Information
#
# Table name: mitigation_themes
#
#  id                   :bigint(8)        not null, primary key
#  title                :string
#  position             :integer
#  mitigation_sector_id :integer
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#

FactoryBot.define do
  factory :mitigation_theme, class: 'Mitigation::MitigationTheme' do
    sequence(:position)
    sequence(:title) { |n| ('A'..'Z').to_a[n] }
  end
end
