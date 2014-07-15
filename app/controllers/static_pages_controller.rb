class StaticPagesController < ApplicationController
  def home
    @initShowData = ('_'+'#ffffff'*10)*10
    @shows = Show.all
    @size = 160
  end

  def about
  end
end
