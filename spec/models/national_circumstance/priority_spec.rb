# == Schema Information
#
# Table name: priorities
#
#  id          :bigint(8)        not null, primary key
#  location_id :integer          not null
#  code        :string           not null
#  value       :text             not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

require 'rails_helper'
gem_dir = Gem::Specification.find_by_name('cw_locations').gem_dir
require(gem_dir + '/spec/factories/locations.rb')

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
