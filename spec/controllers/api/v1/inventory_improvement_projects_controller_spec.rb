require 'rails_helper'

describe Api::V1::InventoryImprovementProjectsController, type: :controller do
  context do
    let!(:some_projects) {
      FactoryBot.create_list(:inventory_improvement_project, 3)
    }

    describe 'GET index' do
      it 'returns a successful 200 response' do
        get :index, format: :json
        expect(response).to be_successful
      end

      it 'lists all inventory improvement projects' do
        get :index, format: :json
        parsed_body = JSON.parse(response.body)
        expect(parsed_body.length).to eq(3)
      end

      it 'responds to csv' do
        get :index, format: :csv
        expect(response.content_type).to eq('text/csv')
        expect(response.headers['Content-Disposition']).
          to eq('attachment; filename="inventory_improvement_projects.csv"')
      end
    end
  end
end