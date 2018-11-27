# == Schema Information
#
# Table name: projected_emission_years
#
#  id                    :bigint(8)        not null, primary key
#  year                  :integer
#  value                 :integer
#  projected_emission_id :bigint(8)
#

require 'rails_helper'
RSpec.describe Ghg::ProjectedEmissionYear, type: :model do
  it 'should be invalid when year not present' do
    expect(
      FactoryBot.build(:projected_emission_year, year: nil)
    ).to have(1).error_on(:year)
  end
  it 'should be invalid when value not present' do
    expect(
      FactoryBot.build(:projected_emission_year, value: nil)
    ).to have(1).error_on(:value)
  end
  it 'should be invalid when projected emission not present' do
    expect(
      FactoryBot.build(:projected_emission_year, projected_emission: nil)
    ).to have(1).error_on(:projected_emission)
  end
  let(:projected_emission) {
    FactoryBot.build(:projected_emission_value)
  }
  it 'should be valid' do
    expect(FactoryBot.build(:projected_emission_year,
                            projected_emission: projected_emission)).to be_valid
  end
end
