require 'rails_helper'
require 'csv'

headers = %w(Project Sector Objective Partner Donor Outcome Status Timelines)
values = [
  'emission factors',
  'Energy',
  'To develop emission factors',
  'test',
  'test',
  'test',
  'Completed',
  '2014-2015'
]
data_csv = CSV.generate do |csv|
  csv << headers
  csv << values
end
object_contents = {ImportInventoryImprovement::DATA_FILEPATH => data_csv}

RSpec.describe ImportInventoryImprovement do
  subject { ImportInventoryImprovement.new.call }

  before :all do
    Aws.config[:s3] = {
      stub_responses: {
        get_object: lambda { |context|
          {body: object_contents[context.params[:key]]}
        }
      }
    }
  end

  after :all do
    Aws.config[:s3] = {
      stub_responses: nil
    }
  end

  it 'Creates inventory improvement projects' do
    expect { subject }.to change { InventoryImprovement::Project.count }.by(1)
  end
end
