require 'rails_helper'

RSpec.describe FinancialResource::Donor, type: :model do
  it 'should be invalid when name not present' do
    expect(
      FactoryBot.build(:donor, name: '')
    ).to have(1).error_on(:name)
  end
  it 'should be valid' do
    expect(FactoryBot.build(:donor)).to be_valid
  end
end
