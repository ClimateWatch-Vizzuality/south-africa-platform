namespace :financial_resource do
  desc 'Imports financial resource data from the csv sources'
  task import: :environment do
    TimedLogger.log('import financial resource data') do
      ImportFinancialResource.new.call
    end
  end
end
