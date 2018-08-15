Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get '(*endpoint)', controller: :api, action: :route_not_found
    end
  end

  root 'application#index'
  get '(*frontend)', to: 'application#index'
end
