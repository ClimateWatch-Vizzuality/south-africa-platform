require 'rails_helper'

describe Api::V1::NationalCircumstance::PrioritiesController, type: :controller do
  context do
    let!(:indicators) {
      FactoryBot.create_list(:priority_complete, 3)
    }
    let!(:some_indicators) {
      FactoryBot.create_list(:nc_indicator, 5)
    }

    describe 'GET index' do
      it 'returns a successful 200 response' do
        get :index, format: :json
        expect(response).to be_successful
      end

      it 'lists all priority variables' do
        get :index, format: :json
        parsed_body = JSON.parse(response.body)
        expect(parsed_body[parsed_body.keys.first].length).to eq(3)
      end

      it 'lists the metadata' do
        get :index, format: :json
        parsed_body = JSON.parse(response.body)
        expect(parsed_body['meta'].length).to eq(5)
      end
    end
  end
end
