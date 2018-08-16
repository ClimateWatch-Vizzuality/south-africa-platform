source 'https://rubygems.org'
ruby '2.5.1'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?('/')
  "https://github.com/#{repo_name}.git"
end

gem 'rails', '~> 5.1.6'
gem 'pg', '>= 0.18', '< 2.0'
gem 'puma', '~> 3.7'
gem 'webpacker'
gem 'sass-rails', '~> 5.0'
gem 'jbuilder', '~> 2.5'

gem 'active_model_serializers', '~> 0.10.0'
gem 'responders'

gem 'aws-sdk', '~> 2'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

group :development, :test do
  gem 'dotenv-rails'
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
  gem 'rspec-rails', '~> 3.5'
  gem 'rspec-collection_matchers'
  gem 'rails-controller-testing'
  gem 'factory_bot_rails'
  # Adds support for Capybara system testing and selenium driver
  gem 'capybara', '~> 2.13'
  gem 'selenium-webdriver'
end

group :development do
  gem 'dotenv-rails'
  # Access an IRB console on exception pages or by using <%= console %> anywhere in the code.
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '>= 3.0.5', '< 3.2'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
  gem 'annotate'
end

group :test do
  gem 'simplecov', require: false
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]

git 'https://github.com/ClimateWatch-Vizzuality/climate-watch-gems.git' do
  gem 'climate_watch_engine', '~> 1.1.0'
  gem 'cw_locations', '~> 1.1.0', require: 'locations'
  gem 'cw_historical_emissions', '~> 1.1.0', require: 'historical_emissions'
end

# for debugging
# gem 'climate_watch_engine', '~> 1.0.1', path: '../climate-watch-gems'
# gem 'cw_locations', '~> 1.0.3', require: 'locations', path: '../climate-watch-gems'
# gem 'cw_historical_emissions', '~> 1.0.3', require: 'historical_emissions', path: '../climate-watch-gems'
