HistoricalEmissions::HistoricalEmissionsController.class_eval do
  HistoricalEmissionsMetadata = Struct.new(
    :data_sources,
    :sectors,
    :gases,
    :gwps,
    :locations
  ) do
    alias_method :read_attribute_for_serialization, :send

    def self.model_name
      'metadata'
    end
  end

  def meta
    render(
      json: HistoricalEmissionsMetadata.new(
        merged_records(grouped_records),
        fetch_meta_sectors,
        ::HistoricalEmissions::Gas.all,
        ::HistoricalEmissions::Gwp.all,
        Location.all
      ),
      serializer: ::HistoricalEmissions::MetadataSerializer
    )
  end
end
