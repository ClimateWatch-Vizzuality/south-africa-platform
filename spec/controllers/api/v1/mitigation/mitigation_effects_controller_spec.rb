require 'rails_helper'

describe Api::V1::Mitigation::MitigationEffectsController, type: :controller do
  context do
    let!(:some_indicators) {
      FactoryBot.create_list(:mitigation_indicator, 5)
    }
    let!(:some_effects) {
      FactoryBot.create_list(:mitigation_effect, 3)
    }

    describe 'GET index' do
      it 'returns a successful 200 response' do
        get :index, format: :json
        expect(response).to be_successful
      end

      it 'lists all adaptation variables' do
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
