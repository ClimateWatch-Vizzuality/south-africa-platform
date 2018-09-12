require 'rails_helper'

describe Api::V1::Mitigation::MitigationThemesController, type: :controller do
  context do
    let!(:some_themes) {
      FactoryBot.create_list(:mitigation_theme_complete, 3)
    }

    describe 'GET index' do
      it 'returns a successful 200 response' do
        get :index, format: :json
        expect(response).to be_successful
      end

      it 'lists all adaptation variables' do
        get :index, format: :json
        parsed_body = JSON.parse(response.body)
        expect(parsed_body.length).to eq(3)
      end
    end
  end
end