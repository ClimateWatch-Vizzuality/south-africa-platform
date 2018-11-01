require 'rails_helper'

RSpec.describe Mitigation::FlagshipComponent, type: :model do
  it 'should be invalid when name is not present' do
    expect(
      FactoryBot.build(:flagship_component, name: '')
    ).to have(1).error_on(:name)
  end
  it 'should be invalid when programme is not present' do
    expect(
      FactoryBot.build(:flagship_component)
    ).to have(1).error_on(:flagship_programme)
  end

  let(:theme) {
    FactoryBot.build(:flagship_theme)
  }
  let(:programme) {
    FactoryBot.build(:flagship_programme, flagship_theme: theme)
  }
  it 'should be valid' do
    expect(FactoryBot.build(:flagship_component, flagship_programme: programme)).to be_valid
  end
end
