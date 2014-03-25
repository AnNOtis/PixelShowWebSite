class UsersController < ApplicationController
  def show
  	@user = User.find(params[:id])
  end
  def new
  	@user = User.new
  end
  def create
  	@user = User.new(user_params)
  	@user.save

  	redirect_to 'home'
  end
  def update
  	@user = User.find(params[:id])
  end


  def user_params
  	params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end
end
