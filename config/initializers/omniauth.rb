Rails.application.config.middleware.use OmniAuth::Builder do
  auth = YAML.load(File.open("#{Rails.root}/config/omniauth.yml"))[Rails.env]
  provider :developer unless Rails.env.production?
  provider :facebook, auth['facebook']['app_id'],auth['facebook']['app_secret'] 
end