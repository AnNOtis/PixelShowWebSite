class User < ActiveRecord::Base
	before_save { self.email = email.downcase } #會在create update之前都被觸發
	before_create :create_remenber_token
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

	private
	  def create_remenber_token
	  	self.remember_token = User.hash(User.new_remember_token)
	  end
end
