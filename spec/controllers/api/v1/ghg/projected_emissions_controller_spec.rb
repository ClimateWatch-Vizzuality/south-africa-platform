require 'rails_helper'

describe Api::V1::Ghg::ProjectedEmissionsController, type: :controller do
  context do
    let!(:some_indicators) {
      FactoryBot.create_list(:projected_emission_metadata, 5)
    }
    let!(:some_projected_emissions) {
      FactoryBot.create_list(:projected_emission_value, 3)
    }

    describe 'GET index' do
      it 'returns a successful 200 response' do
        get :index, format: :json
        expect(response).to be_successful
      end

      it 'lists all inventory improvement projects' do
        get :index, format: :json
        parsed_body = JSON.parse(response.body)
        expect(parsed_body[parsed_body.keys.first].length).to eq(3)
      end

      it 'responds to zip' do
        get :index, format: :zip
        expect(response.content_type).to eq('application/zip')
        expect(response.headers['Content-Disposition']).
          to eq('attachment; filename=projected_emissions.zip')
      end

      it 'lists the metadata' do
        get :index, format: :json
        parsed_body = JSON.parse(response.body)
        expect(parsed_body['meta'].length).to eq(5)
      end
    end
  end
end
