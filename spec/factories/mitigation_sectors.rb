# == Schema Information
#
# Table name: mitigation_sectors
#
#  id          :bigint(8)        not null, primary key
#  name        :string
#  description :text
#  position    :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

FactoryBot.define do
  factory :mitigation_sector, class: 'Mitigation::MitigationSector' do
    sequence(:position)
    sequence(:name) { |n| ('A'..'Z').to_a[n] }
    sequence(:description) { |n| ('AA'..'ZZ').to_a[n] }
  end
end
