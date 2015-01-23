class UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :shows]
  before_action :require_login, :only => [:show, :edit, :update]
  before_action :is_owner, :only => [:edit, :update]
  def show

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

  end

  def update
    if( User.update(params[:id], user_update_params) )
      redirect_to root_path
    else
      render 'edit'
    end
  end

  def shows
    if current_user.id == @user.id
      redirect_to me_shows_path
      return
    end
    @shows = @user.shows.all
    
    render 'me/shows/index'
  end

  private
    def user_params
    	params.require(:user).permit(:name, :email, :password, :password_confirmation)
    end

    def user_update_params
      params.require(:user).permit(:name, :password, :password_confirmation)
    end

    def set_user
      @user = User.find(params[:id])
    end

    def is_owner
      if params[:id].to_i != current_user.id
        redirect_to root_path, notice: "無此頁面"
      end
    end
end
