namespace :db do
  desc 'Add content management records'
  task add_content_management_records: :environment do
    file = File.join(Rails.root, 'config/sections_content_management.yml')
    config = YAML.load_file(file)

    config['sections'].each do |section|
      main_section = SectionContent.create(name: section['name'])
      section['subsections'].each do |subsection|
        main_section.subsections << SectionContent.create(name: subsection['name'])
      end
    end

    puts 'All sections for content management created!'
  end
end
