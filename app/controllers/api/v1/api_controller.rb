module Api
  module V1
    class ApiController < ActionController::API
      include ::ClimateWatchEngine::Cors
      include ::ClimateWatchEngine::ExceptionResponses
      include ::ClimateWatchEngine::Caching
    end
  end
end