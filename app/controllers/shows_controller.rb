class ShowsController < ApplicationController
  def new
  	@show = current_user.shows.new
  end

  def show
  end
end
