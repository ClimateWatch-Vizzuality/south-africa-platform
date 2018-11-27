namespace :ghg do
  desc 'Imports ghg data from the csv sources'
  task import: :environment do
    TimedLogger.log('import ghg data') do
      ImportGhg.new.call
    end
  end
end
