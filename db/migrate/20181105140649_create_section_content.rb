class CreateSectionContent < ActiveRecord::Migration[5.2]
  def change
    create_table :section_contents do |t|
      t.string :title
      t.text :description
    end
  end
end
