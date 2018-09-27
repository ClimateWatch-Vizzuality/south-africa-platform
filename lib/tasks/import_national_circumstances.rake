namespace :national_circumstances do
  desc 'Imports national_circumstances'
  task import: :environment do
    TimedLogger.log('import national circumstances') do
      ImportNationalCircumstances.new.call
    end
  end
end
