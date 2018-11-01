require 'rails_helper'

RSpec.describe Mitigation::MitigationSector, type: :model do
  it 'should be invalid when name not present' do
    expect(
      FactoryBot.build(:mitigation_sector, name: nil)
    ).to have(1).error_on(:name)
  end
  it 'should be valid' do
    expect(FactoryBot.build(:mitigation_sector)).to be_valid
  end
end
