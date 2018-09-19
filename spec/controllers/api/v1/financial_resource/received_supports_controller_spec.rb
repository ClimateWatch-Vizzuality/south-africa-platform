require 'rails_helper'

describe Api::V1::FinancialResource::ReceivedSupportsController, type: :controller do
  context do
    let!(:some_supports) {
      FactoryBot.create_list(:received_support_complete, 3)
    }

    describe 'GET index' do
      it 'returns a successful 200 response' do
        get :index, format: :json
        expect(response).to be_successful
      end

      it 'lists all received supports variables' do
        get :index, format: :json
        parsed_body = JSON.parse(response.body)
        expect(parsed_body[parsed_body.keys.first].length).to eq(3)
      end
    end
  end
end
