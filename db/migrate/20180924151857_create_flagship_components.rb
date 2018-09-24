class CreateFlagshipComponents < ActiveRecord::Migration[5.2]
  def change
    create_table :flagship_components do |t|
      t.integer :flagship_programme_id
      t.string :name, optional: false
      t.text :main_activities
      t.string :lead
      t.string :status
      t.text :milestone
      t.text :barriers
      t.text :next_steps
      t.string :timeframe
      t.text :support

      t.timestamps

      t.foreign_key :flagship_programmes
    end
  end
end
