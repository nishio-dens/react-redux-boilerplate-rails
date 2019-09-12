Rails.application.routes.draw do
  root to: "home#index"

  get "*path", to: "home#index", format: false
end
