require 'rails_helper'

RSpec.describe Mitigation::FlagshipProgramme, type: :model do
  it 'should be invalid when position is not present' do
    expect(
      FactoryBot.build(:flagship_programme, position: '')
    ).to have(1).error_on(:position)
  end
  it 'should be invalid when flagship is not present' do
    expect(
      FactoryBot.build(:flagship_programme)
    ).to have(1).error_on(:flagship_theme)
  end

  let(:theme) {
    FactoryBot.build(:flagship_theme)
  }
  it 'should be valid' do
    expect(FactoryBot.build(:flagship_programme, flagship_theme: theme)).to be_valid
  end
end
