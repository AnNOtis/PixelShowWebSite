class ShowsController < ApplicationController
  before_action :require_login
  def index
    @shows = current_user.shows.all
  end
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
    behavior = params['behavior'] || 'auto_save'
    self.send(behavior.to_sym,params)
  end

  def show
  end


  private
    def finish_edit(params)
      Show.update(params[:show])
      redirect_to shows_url
    end
    def auto_save(params)
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
	  def show_params
	  	params.require(:show).permit(:name,:permit)
	  end
    def autosave_params
      params.require(:show).permit(:name, :data)
    end
  
end
