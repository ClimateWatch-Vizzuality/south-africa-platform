ActiveAdmin.register SectionContent do
  actions :all, except: [:destroy, :create, :new]
  config.filters = false
  permit_params :title, :description

  controller do
    def scoped_collection
      SectionContent.where(subsection_id: nil)
    end
  end

  form do |f|
    f.inputs 'Main Section' do
      f.input :name, input_html: {readonly: true}
      f.input :title, label: 'Title'
      f.input :description, label: 'Description'
    end
    f.inputs 'Subsections' do
      f.has_many :subsections, new_record: false, allow_destroy: false do |a|
        a.input :name, input_html: {readonly: true}
        a.input :title
        a.input :description
      end
    end
    f.actions
  end

  index download_links: false, new_link: false, new_record: false, allow_destroy: false do
    column :name
    column :title
    column :description
    actions
  end

  show do
    h3 section_content.name
    table_for section_content do
      column :name
      column :title
      column :description
    end
    h3 'Subsections'
    table_for section_content.subsections do
      column :name
      column :title
      column :description
    end
  end
end
