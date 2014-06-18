class UsersController < ApplicationController
  before_action :require_login, :except => :new
  def show
  	@user = User.find(params[:id])
  end
  def new
  	@user = User.new
  end
  def create
  	@user = User.new(user_params)
  	if @user.save
      redirect_to @user
    else
      render 'new'
    end
  	
  end
  def edit
    @user = User.find(params[:id])
  end
  def update
    if( User.update(params[:id], user_update_params) )
      redirect_to root_path
    else
      render 'edit'
    end
  end

  private
    def user_params
    	params.require(:user).permit(:name, :email, :password, :password_confirmation)
    end
    def user_update_params
      params.require(:user).permit(:name, :password, :password_confirmation)
    end
end
