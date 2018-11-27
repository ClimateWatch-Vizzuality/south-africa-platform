require 'rails_helper'

describe Api::V1::Mitigation::MitigationSectorsController, type: :controller do
  context do
    let!(:some_sectors) {
      FactoryBot.create_list(:mitigation_sector, 3)
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
    end
  end
end
