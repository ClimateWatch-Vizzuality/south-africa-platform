class CreateGhgProjectedEmissionsYears < ActiveRecord::Migration[5.2]
  def change
    create_table :projected_emission_years do |t|
      t.integer :year
      t.integer :value
      t.belongs_to :projected_emission, foreign_key: true

      t.timestamp
    end
  end
end
