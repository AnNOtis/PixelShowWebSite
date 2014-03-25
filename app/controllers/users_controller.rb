class UsersController < ApplicationController
  def show
  	@user = User.find(params[:id])
  end
  def new
  	@user = User.new
  end
  def create
  	@user = User.new(params[:event])
  	@user.save

  	redirect_to 'home'
  end
  def update
  	@user = User.find(params[:id])
  end
end
