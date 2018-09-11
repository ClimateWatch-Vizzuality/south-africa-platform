Rails.application.routes.draw do
  mount Locations::Engine => 'api/v1/locations'
  mount HistoricalEmissions::Engine => 'api/v1'

  namespace :api do
    namespace :v1 do
      resources :inventory_improvement_projects,
                only: [:index],
                defaults: { format: 'json' }
      namespace :mitigation do
        resources :flagship_programmes, only: [:index], controller: :flagship_programmes
        resources :mitigation_actions, only: [:index], controller: :mitigation_actions
        resources :mitigation_themes, only: [:index], controller: :mitigation_themes
        resources :mitigation_sectors, only: [:index], controller: :mitigation_sectors
      end
      get '(*endpoint)', controller: :api, action: :route_not_found
    end
  end

  root 'application#index'
  get '(*frontend)', to: 'application#index'
end
