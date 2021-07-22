Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'sentences/index'
      post 'sentences/create'
      delete 'sentences/:id', to: 'sentences#destroy'

      get 'entities/index'
      post 'entities/create'
      post 'entities', to: 'entities#create'
      delete 'entities/:id', to: 'entities#destroy'
    end
  end


  resources :entities
  resources :sentences
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  root 'sentences#index'
end
