require 'rails_helper'

RSpec.describe NationalCircumstance::CategoryGroup, type: :model do
  it 'should be invalid when name is not present' do
    expect(
      FactoryBot.build(:nc_category_group, name: '')
    ).to have(1).error_on(:name)
  end

  it 'should be valid' do
    expect(FactoryBot.build(:nc_category_group)).to be_valid
  end
end
