class ImportInventoryImprovement
  DATA_FILEPATH =
    "#{CW_FILES_PREFIX}inventory_improvement_projects.csv".freeze

  def call
    cleanup
    load_csv
    import_data
  end

  private

  def cleanup
    InventoryImprovement::Project.delete_all
  end

  def load_csv
    @csv = S3CSVReader.read(DATA_FILEPATH)
  end

  def import_data
    @csv.each do |row|
      InventoryImprovement::Project.create(
        name: row[:project],
        sector: row[:sector],
        objective: row[:objective],
        partner: row[:partner],
        donor: row[:donor],
        outcome: row[:outcome],
        status: row[:status],
        timelines: row[:timelines]
      )
    end
  end
end
