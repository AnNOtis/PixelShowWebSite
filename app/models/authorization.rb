class Authorization < ActiveRecord::Base
  belongs_to :user
  validates :uid, presence: true, uniqueness: {scope: :provider} 
  def self.find_or_create_from_auth_hash(auth_hash)
    auth = find_by_provider_and_uid(auth_hash['provider'], auth_hash['uid'].to_s)
    unless auth
      user = User.find_or_create_from_auth_hash(auth_hash)
      authorization_create_attr = {
        provider: auth_hash[:provider],
        uid: auth_hash[:uid]
      }
      auth = user.authorizations.create!(authorization_create_attr)
    else
      auth
    end
  end
end
