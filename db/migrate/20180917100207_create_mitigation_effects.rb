class CreateMitigationEffects < ActiveRecord::Migration[5.2]
  def change
    create_table :mitigation_effects do |t|
      t.string :theme, optional: false
      t.string :name, optional: false
      t.string :coordinator
      t.string :effects_1
      t.string :effects_2
      t.string :effects_3
      t.string :effects_4
      t.string :effects_5
      t.string :effects_6
      t.string :effects_7
      t.string :effects_8
      t.string :effects_9
      t.string :effects_10
      t.string :effects_11
      t.string :effects_12

      t.timestamps
    end
  end
end
