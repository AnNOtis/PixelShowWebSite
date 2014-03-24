class User < ActiveRecord::Base
	validates :name, presence:true,length:{ in: 3..20 }
	VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
	validates :email, presence:true,format:{ with:VALID_EMAIL_REGEX }, uniqueness: { case_sensitive:false }
end
