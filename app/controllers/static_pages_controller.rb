class StaticPagesController < ApplicationController
  def home
    @initShowData = ('_'+'#ffffff'*10)*10
    @shows = Show.page(params[:page])
    @size = 160
  end

  def about
  end
end
