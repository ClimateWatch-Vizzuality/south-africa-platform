Rails.application.routes.draw do
  mount Locations::Engine => 'api/v1/locations'
  mount HistoricalEmissions::Engine => 'api/v1'

  namespace :api do
    namespace :v1 do
      get '(*endpoint)', controller: :api, action: :route_not_found
    end
  end

  root 'application#index'
  get '(*frontend)', to: 'application#index'
end
