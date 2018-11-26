HistoricalEmissions::MetadataSerializer.class_eval do
  def sector
    object.sectors.map do |g|
      g.slice(:id, :name, :parent_id)
    end
  end
end
