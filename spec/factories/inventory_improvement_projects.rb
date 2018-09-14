FactoryBot.define do
  factory :inventory_improvement_project, class: 'InventoryImprovement::Project' do
    sequence(:name) { |n| "#{2020 + n * 5} Low pledge" }
    status { 'Under Implementation' }
  end
end
