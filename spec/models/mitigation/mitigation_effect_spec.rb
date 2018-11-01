require 'rails_helper'

RSpec.describe Mitigation::MitigationEffect, type: :model do
  it 'should be invalid when theme not present' do
    expect(
      FactoryBot.build(:mitigation_effect, theme: '')
    ).to have(1).error_on(:theme)
  end
  it 'should be invalid when name not present' do
    expect(
      FactoryBot.build(:mitigation_effect, name: '')
    ).to have(1).error_on(:name)
  end
  it 'should be valid' do
    expect(FactoryBot.build(:mitigation_effect)).to be_valid
  end
end
