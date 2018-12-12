require 'rails_helper'

describe Api::V1::FinancialResource::ReceivedSupportsController, type: :controller do
  context do
    let!(:some_indicators) {
      FactoryBot.create_list(:financial_indicator, 5)
    }
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

      it 'lists the metadata' do
        get :index, format: :json
        parsed_body = JSON.parse(response.body)
        expect(parsed_body['meta'].length).to eq(5)
      end

      it 'responds to zip' do
        get :index, format: :zip
        expect(response.content_type).to eq('application/zip')
      end
    end
  end
end
