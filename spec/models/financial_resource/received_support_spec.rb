# == Schema Information
#
# Table name: received_supports
#
#  id            :bigint(8)        not null, primary key
#  donor_id      :integer
#  finance_flow  :string
#  type_funds    :string
#  amount_zar    :integer
#  amount_usd    :integer
#  timeframes    :string
#  focus_area_1  :boolean          default(FALSE)
#  focus_area_2  :boolean          default(FALSE)
#  focus_area_3  :boolean          default(FALSE)
#  focus_area_4  :boolean          default(FALSE)
#  focus_area_5  :boolean          default(FALSE)
#  focus_area_6  :boolean          default(FALSE)
#  focus_area_7  :boolean          default(FALSE)
#  focus_area_8  :boolean          default(FALSE)
#  cofinancing   :integer
#  purpose_funds :text
#  program_funds :text
#  outcome_funds :text
#

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
  it 'should be invalid when type_funds not present' do
    expect(
      FactoryBot.build(:received_support, donor: donor, type_funds: nil)
    ).to have(1).error_on(:type_funds)
  end
  it 'should be valid' do
    expect(FactoryBot.build(:received_support, donor: donor)).to be_valid
  end
end
