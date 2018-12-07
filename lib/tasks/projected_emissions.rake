namespace :projected_emissions do
  desc 'Imports projected_emissions data from the csv sources'
  task import: :environment do
    TimedLogger.log('import projected emissions data') do
      ImportProjectedEmissions.new.call
    end
  end
end
