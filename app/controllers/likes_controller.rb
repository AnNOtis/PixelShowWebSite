class LikesController < ApplicationController
  def create
  	show = Show.find(like_params[:show_id])
  	like = show.likes.build(user_id: current_user.id, show_id: like_params[:show_id])
  	respond_to do |format|
    	if show.save
        show.update(like_number: (show.like_number+1))
    		format.json {render json: show}
    	else
    		format.json {render json: show.errors, status: 403}
    	end
    end
  end
  def delete
  end
  private
    def like_params
    	params.permit(:show_id)
    end
end
