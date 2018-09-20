# == Schema Information
#
# Table name: support_needs
#
#  id           :bigint(8)        not null, primary key
#  category     :string
#  focus_area   :string
#  reference    :string
#  support_type :string
#  scheme       :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

FactoryBot.define do
  factory :support_need, class: 'FinancialResource::SupportNeed' do
    sequence(:category) { |n| ('A'..'Z').to_a[n] }
    sequence(:focus_area) { |n| ('A'..'Z').to_a[n] }
    sequence(:reference) { |n| ('A'..'Z').to_a[n] }
    sequence(:support_type) { |n| ('A'..'Z').to_a[n] }
    sequence(:scheme) { |n| ('A'..'Z').to_a[n] }
  end
end
