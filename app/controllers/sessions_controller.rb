class SessionsController < ApplicationController
  def new

  end

  def create
    if auth_hash.nil?
      #一般方式登入
      #is_auth確保為一般方式登入的帳號
    	user = User.find_by(email:params[:session][:email].downcase,is_auth:nil)
    	if user && user.authenticate(params[:session][:password])
    		# 使用者存在且密碼正確的話
    		sign_in user
  	    redirect_to me_shows_path
    	else
    		flash[:error] = '錯誤的賬戶或密碼' # Not quite right!
    		render 'new'
    	end
    else
      #第三方auth登入
      authorization = Authorization.find_or_create_from_auth_hash(auth_hash)
      sign_in authorization.user
      redirect_to root_path
    end
  end

  def destroy
    sign_out
    redirect_to root_path
  end
  private
    def auth_hash
      request.env['omniauth.auth']
    end

end
