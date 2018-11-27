namespace :mitigation do
  desc 'Imports mitigation data from the csv sources'
  task import: :environment do
    TimedLogger.log('import mitigation data') do
      ImportMitigation.new.call
    end
  end
end
