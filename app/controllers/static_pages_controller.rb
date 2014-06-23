class StaticPagesController < ApplicationController
  def home
    @initShowData = ('_'+'#ffffff'*10)*10
  end

  def about
  end
end
