class StaticPagesController < ApplicationController
  def home
    @initShowData = ('_'+'#ffffff'*10)*10
    @shows = Show.page(params[:page])
    @new_show = current_user.shows.build() if current_user
  end

  def about
  end
end
