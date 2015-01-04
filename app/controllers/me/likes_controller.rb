class Me::LikesController < ApplicationController
  before_action :require_login
  def create
  	show = Show.find(params[:id])
  	like = show.likes.build(user_id: current_user.id, show_id: params[:id])

  	respond_to do |format|
    	if show.save
        show.reload
    		format.json {render json: show.likes.size}
    	else
    		format.json {render json: show.errors, status: 403}
    	end
    end
  end
  def destroy
    show = Show.find(params[:id])

    respond_to do |format|
      if show.likes.find_by(user_id:current_user.id).destroy
        show.reload
        format.json {render json: show.likes.size}
      else
        format.json {render json: show.errors, status:403}
      end
    end
  end
  private

end
