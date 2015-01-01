Rails.application.config.middleware.use OmniAuth::Builder do
  provider :developer unless Rails.env.production?
  provider :facebook, ENV["facebook_app_id"],ENV["facebook_app_secret"]
end