Rails.application.routes.draw do
  mount Locations::Engine => 'api/v1/locations'
  mount HistoricalEmissions::Engine => 'api/v1'

  namespace :api do
    namespace :v1 do
      resources :inventory_improvement_projects,
                only: [:index],
                defaults: { format: 'json' }
      namespace :mitigation do
        resources :flagship_programmes, only: [:index],
                  controller: :flagship_programmes,
                  defaults: { format: 'json' }
        resources :flagship_themes, only: [:index],
                  controller: :flagship_themes,
                  defaults: { format: 'json' }
        resources :mitigation_actions, only: [:index],
                  controller: :mitigation_actions,
                  defaults: { format: 'json' }
        resources :mitigation_themes, only: [:index],
                  controller: :mitigation_themes,
                  defaults: { format: 'json' }
        resources :mitigation_sectors, only: [:index],
                  controller: :mitigation_sectors,
                  defaults: { format: 'json' }
        resources :mitigation_effects, only: [:index],
                  controller: :mitigation_effects,
                  defaults: { format: 'json' }
      end
      namespace :financial_resource do
        resources :support_needs, only: [:index],
                  controller: :support_needs,
                  defaults: { format: 'json' }
        resources :received_supports, only: [:index],
                  controller: :received_supports,
                  defaults: { format: 'json' }
      end
      namespace :ghg do
        resources :projected_emissions, only: [:index],
                  controller: :projected_emissions,
                  defaults: { format: 'json' }
      end
      resources :inventory_improvement_projects,
                only: [:index],
                defaults: { format: 'json' }
      get '(*endpoint)', controller: :api, action: :route_not_found
    end
  end

  root 'application#index'
  get '(*frontend)', to: 'application#index'
end
