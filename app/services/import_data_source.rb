class ImportDataSource
  DATA_FILEPATH =
    "#{CW_FILES_PREFIX}metadata/data_sources.csv".freeze

  def call
    cleanup
    load_csv
    import_data
  end

  private

  def cleanup
    DataSource.delete_all
  end

  def load_csv
    @csv = S3CSVReader.read(DATA_FILEPATH)
  end

  def import_data
    @csv.each do |row|
      DataSource.create(
        short_title: row[:short_title],
        title: row[:title],
        source_organization: row[:source_organization],
        learn_more_link: row[:learn_more_link],
        citation: row[:citation]
      )
    end
  end
end
