class CreateDataSources < ActiveRecord::Migration[5.2]
  def change
    create_table :data_sources do |t|
      t.string :short_title
      t.string :title
      t.string :source_organization
      t.string :learn_more
      t.string :citation

      t.timestamps
    end
  end
end
