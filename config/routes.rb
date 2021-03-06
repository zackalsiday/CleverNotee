Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
    namespace :api, defaults: {format: :json} do
    resources :notebooks 
    resources :users, only: [:create, :show]
    resource :session, only: [:create, :destroy]
    resources :notes
    resources :tags 
    resources :note_tags 
  end

  
  root "static_pages#root"

end
