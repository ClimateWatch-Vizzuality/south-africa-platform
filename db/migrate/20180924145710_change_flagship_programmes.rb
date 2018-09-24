class ChangeFlagshipProgrammes < ActiveRecord::Migration[5.2]
  def change
    rename_column :flagship_programmes, :example, :sub_programs
    add_column :flagship_programmes, :work_package, :text
    add_column :flagship_programmes, :outcomes, :text
  end
end
