class ShowsController < ApplicationController
  before_action :require_login
  def new
  	@show = current_user.shows.build()
  end
  def create
  	@show = current_user.shows.build(show_params)

  	if @show.save
  		redirect_to @show
  	else
  		render 'new'
  	end
  end
  def show
  end

  private
	  def show_params
	  	params.require(:show).permit(:name,:permit)
	  end

  
end
