Rails.application.routes.draw do
  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
  end
  root 'dashboard#index'
  post "/graphql", to: "graphql#execute"
  # routes matching react-router
  get '/login', to: 'dashboard#index'
  get '/register', to: 'dashboard#index'
  
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end


