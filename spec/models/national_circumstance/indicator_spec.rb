# == Schema Information
#
# Table name: national_circumstance_indicators
#
#  id         :bigint(8)        not null, primary key
#  code       :string
#  indicator  :string
#  category   :string
#  unit       :string
#  definition :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'rails_helper'

RSpec.describe NationalCircumstance::Indicator, type: :model do
  it 'should be invalid when code is not present' do
    expect(
      FactoryBot.build(:national_circumstance_indicator, code: '')
    ).to have(1).error_on(:code)
  end
  it 'should be invalid when indicator is not present' do
    expect(
      FactoryBot.build(:national_circumstance_indicator, indicator: '')
    ).to have(1).error_on(:indicator)
  end

  it 'should be valid' do
    expect(FactoryBot.build(:national_circumstance_indicator)).to be_valid
  end
end
