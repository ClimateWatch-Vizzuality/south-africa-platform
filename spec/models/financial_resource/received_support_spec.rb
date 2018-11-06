require 'rails_helper'

RSpec.describe FinancialResource::ReceivedSupport, type: :model do
  it 'should be invalid when donor not present' do
    expect(
      FactoryBot.build(:received_support)
    ).to have(1).error_on(:donor)
  end
  let(:donor) {
    FactoryBot.build(:donor)
  }
  it 'should be invalid when finance_flow not present' do
    expect(
      FactoryBot.build(:received_support, donor: donor, finance_flow: nil)
    ).to have(1).error_on(:finance_flow)
  end
  it 'should be valid' do
    expect(FactoryBot.build(:received_support, donor: donor)).to be_valid
  end
end
