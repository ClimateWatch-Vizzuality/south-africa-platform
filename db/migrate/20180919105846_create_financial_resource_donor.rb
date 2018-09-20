class CreateFinancialResourceDonor < ActiveRecord::Migration[5.2]
  def change
    create_table :donors do |t|
      t.string :name, optional: false
      t.text :description

      t.timestamps
    end
  end
end
