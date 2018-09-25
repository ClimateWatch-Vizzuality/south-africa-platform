# == Schema Information
#
# Table name: flagship_programmes
#
#  id                :bigint(8)        not null, primary key
#  sub_programs      :text
#  description       :text
#  position          :integer
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  work_package      :text
#  outcomes          :text
#  flagship_theme_id :integer
#

FactoryBot.define do
  factory :flagship_programme, class: 'Mitigation::FlagshipProgramme' do
    sequence(:sub_programs) { |n| ('A'..'Z').to_a[n] }
    sequence(:description) { |n| ('A'..'Z').to_a[n] }
    sequence(:position) { |n| n }
    sequence(:work_package) { |n| ('A'..'Z').to_a[n] }
    sequence(:outcomes) { |n| ('A'..'Z').to_a[n] }

    factory :flagship_programme_complete, class: 'Mitigation::FlagshipProgramme' do
      association :flagship_theme, factory: :flagship_theme, strategy: :build
    end
  end
end
