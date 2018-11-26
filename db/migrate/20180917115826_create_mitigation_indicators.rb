class CreateMitigationIndicators < ActiveRecord::Migration[5.2]
  def change
    create_table :mitigation_indicators do |t|
      t.string :code, optional: false
      t.string :indicator, optional: false
      t.string :unit
      t.string :cautions

      t.timestamps
    end
  end
end
