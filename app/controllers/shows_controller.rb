class ShowsController < ApplicationController
  before_action :require_login
  def new
  	@show = current_user.shows.build()
  end
  def create
  	@show = current_user.shows.build(show_params)
  	if @show.save
  		redirect_to edit_show_path(@show)
  	else
  		render 'new'
  	end
  end
  def edit
    @show = current_user.shows.find(params[:id])
    if @show.data.nil?
      @show.data = ('_'+'#fff'*10)*10
    end
  end
  def update
    if Show.update(params[:show])
      redirect_to shows_url
    else
    end
  end

  def show
  end
  def auto_save
    @show = current_user.shows.find(params[:id]).update(data: params[:data]);
    if @show
      respond_to do |format|
        format.json { 
          render json: true
        }
      end
    else
      respond_to do |format|
        format.json { 
          render json: @show.errors
        }
      end
    end
  end
  private
	  def show_params
	  	params.require(:show).permit(:name,:permit)
	  end
    def autosave_params
      params.require(:show).permit(:name, :data)
    end
  
end
