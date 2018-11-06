require 'rails_helper'

RSpec.describe NationalCircumstance::Priority, type: :model do
  it 'should be invalid when code is not present' do
    expect(
      FactoryBot.build(:priority, code: '')
    ).to have(1).error_on(:code)
  end
  it 'should be invalid when value is not present' do
    expect(
      FactoryBot.build(:priority, value: '')
    ).to have(1).error_on(:value)
  end
  it 'should be invalid when location is not present' do
    expect(
      FactoryBot.build(:priority)
    ).to have(1).error_on(:location)
  end

  let(:location) {
    FactoryBot.build(:location)
  }
  it 'should be valid' do
    expect(FactoryBot.build(:priority, location: location)).to be_valid
  end
end
