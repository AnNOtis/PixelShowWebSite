class Me::ShowsController < ApplicationController
  before_action :require_login
  before_action :find_show, only: [:edit, :destroy, :publish]
  def index
    @user = current_user
    @shows = current_user.shows.all
    @new_show = current_user.shows.build()
  end

  def new
    @show = current_user.shows.build()
  end

  def create
    @show = current_user.shows.build(show_params)
    if @show.save
      redirect_to edit_me_show_path(@show)
    else
      render 'new'
    end
  end

  def edit
    if @show.data.nil?
      @show.data = ('_'+'#ffffff'*10)*10
    end
  end

  def update
    behavior = show_params ? show_params['behavior'] : 'auto_save'
    self.send(behavior.to_sym,params)
  end

  def destroy
    @show.delete
    redirect_to me_shows_path
  end

  def publish
    @show.update(is_public: params[:is_publish])
    redirect_to show_url(@show)
  end

  private
    def find_show
      @show = current_user.shows.find(params[:id])
    end

    def finish_edit(params)
      assign_params = show_params.dup
      assign_params.delete(:behavior)
      show = Show.update(params['id'],assign_params)
      redirect_to show_url(show)
    end

    def auto_save(params)
      @show = current_user.shows.update(params[:id],data: autosave_params[:data]);
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
      params.require(:show).permit(:id,:name,:data,:behavior) if params[:show]
    end

    def autosave_params
      params.permit(:name, :data)
    end

end
