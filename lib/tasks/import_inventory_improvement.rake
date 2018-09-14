namespace :inventory_improvement do
  desc 'Imports inventory improvement projects'
  task import: :environment do
    TimedLogger.log('import inventory improvement projects') do
      ImportInventoryImprovement.new.call
    end
  end
end
