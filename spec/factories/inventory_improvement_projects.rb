# == Schema Information
#
# Table name: inventory_improvement_projects
#
#  id        :bigint(8)        not null, primary key
#  name      :text             not null
#  sector    :text
#  objective :text
#  partner   :text
#  donor     :text
#  outcome   :text
#  status    :text             not null
#  timelines :text
#

FactoryBot.define do
  factory :inventory_improvement_project, class: 'InventoryImprovement::Project' do
    sequence(:name) { |n| "#{2020 + n * 5} Low pledge" }
    status { 'Under Implementation' }
  end
end
