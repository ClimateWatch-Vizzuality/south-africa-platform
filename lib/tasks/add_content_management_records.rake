namespace :db do
  desc 'Add content management records'
  task add_content_management_records: :environment do
    file = File.join(Rails.root, 'config/sections_content_management.yml')
    config = YAML.load_file(file)

    config['sections'].each do |section|
      main_section = SectionContent.find_or_create_by(slug: section['slug']) do |s|
        s.name = section['name']
        s.order = section['order']
      end

      section['subsections'].each do |subsection|
        main_section.subsections << SectionContent.find_or_create_by(slug: subsection['slug']) do |s|
          s.name = subsection['name']
          s.order = subsection['order']
        end
      end
    end

    puts 'All sections for content management created!'
  end
end
