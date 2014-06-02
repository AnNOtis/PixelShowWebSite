class User < ActiveRecord::Base
	has_many :shows,dependent: :destroy
	has_many :authorizations
	before_save { self.email = email.downcase } #會在create update之前都被觸發
	before_create :create_remember_token
	validates :name, presence:true,length:{ in: 3..20 }
	VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
	validates :email, presence:true,format:{ with:VALID_EMAIL_REGEX }, uniqueness: { case_sensitive:false }

	has_secure_password
	validates :password, length:{ minimum:6 }

	def User.new_remember_token
      SecureRandom.urlsafe_base64
	end

	def User.hash(token)
	  Digest::SHA1.hexdigest(token.to_s)
	end
	def self.find_or_create_from_auth_hash(auth_hash)
    info = auth_hash[:info]
    email = info[:email]
    name = info[:name] || email
    if user = User.find_by_email(email)
    	user
    else
    	user_create_attr = {
    		name: name,
    		email: email,
    		is_auth: true,
    		password: auth_hash[:uid],
    		password_confirmation: auth_hash[:uid]
    	}
    	user = User.create(user_create_attr)
    end
  end
	private
	  def create_remember_token
	  	self.remember_token = User.hash(User.new_remember_token)
	  end

end
