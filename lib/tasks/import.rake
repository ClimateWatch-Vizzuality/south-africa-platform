namespace :db do
  desc 'Imports everything'
  task import: :environment do
    Rake::Task['locations:import'].invoke
    Rake::Task['location_members:import'].invoke
    Rake::Task['financial_resource:import'].invoke
    Rake::Task['ghg:import'].invoke
    Rake::Task['inventory_improvement:import'].invoke
    Rake::Task['national_circumstances:import'].invoke
    Rake::Task['mitigation:import'].invoke
    Rake::Task['data_sources:import'].invoke
    Rake::Task['historical_emissions:import'].invoke
    puts 'All done!'
  end
end
