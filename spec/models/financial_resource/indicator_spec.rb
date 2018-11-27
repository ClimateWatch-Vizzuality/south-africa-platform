# == Schema Information
#
# Table name: financial_indicators
#
#  id             :bigint(8)        not null, primary key
#  code           :string
#  indicator      :string
#  category       :string
#  indicator_type :string
#  unit           :string
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#

require 'rails_helper'
RSpec.describe FinancialResource::Indicator, type: :model do
  it 'should be invalid when code not present' do
    expect(
      FactoryBot.build(:financial_indicator, code: '')
    ).to have(1).error_on(:code)
  end
  it 'should be invalid when indicator not present' do
    expect(
      FactoryBot.build(:financial_indicator, indicator: '')
    ).to have(1).error_on(:indicator)
  end
  it 'should be valid' do
    expect(FactoryBot.build(:financial_indicator)).to be_valid
  end
end
