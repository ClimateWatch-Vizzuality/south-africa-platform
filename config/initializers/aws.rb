S3_BUCKET_URL = "https://s3-#{Rails.application.secrets.aws_region}.amazonaws.com/#{Rails.application.secrets.s3_bucket_name}"

s3_bucket_folder = 'climatewatch.org';
cw_files_folder = Rails.env.production? ? 'www.climatewatch.org' : 'staging.climatewatch.org'

CW_FILES_PREFIX = "#{s3_bucket_folder}/#{cw_files_folder}/south-africa/"

return if Rails.env.test?
Aws.config.update({
  region: Rails.application.secrets.aws_region,
  credentials: Aws::Credentials.new(
    Rails.application.secrets.aws_access_key_id,
    Rails.application.secrets.aws_secret_access_key
  ),
  endpoint: "https://s3.amazonaws.com"
})
