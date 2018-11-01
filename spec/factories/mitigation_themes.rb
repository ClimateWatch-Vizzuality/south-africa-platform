# == Schema Information
#
# Table name: mitigation_themes
#
#  id                   :bigint(8)        not null, primary key
#  position             :integer
#  title                :string
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#  mitigation_sector_id :integer
#
# Foreign Keys
#
#  fk_rails_...  (mitigation_sector_id => mitigation_sectors.id)
#

FactoryBot.define do
  factory :mitigation_theme, class: 'Mitigation::MitigationTheme' do
    sequence(:position)
    sequence(:title) { |n| ('A'..'Z').to_a[n] }

    factory :mitigation_theme_complete, class: 'Mitigation::MitigationTheme' do
      association :mitigation_sector, factory: :mitigation_sector, strategy: :build
    end
  end
end
