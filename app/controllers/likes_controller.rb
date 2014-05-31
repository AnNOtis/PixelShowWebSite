class LikesController < ApplicationController
  def create
  	show = Show.find(show_id_params[:show_id])
  	like = show.likes.build(user_id: current_user.id, show_id: show_id_params[:show_id])
  	respond_to do |format|
    	if show.save
        show.update(like_number: (show.like_number+1))
    		format.json {render json: show}
    	else
    		format.json {render json: show.errors, status: 403}
    	end
    end
  end
  def destroy
    show = Show.find(show_id_params[:show_id])
    respond_to do |format|
      if show.likes.find_by(user_id:current_user.id).destroy
        show.update(like_number: (show.like_number-1))
        format.json {render json: show}
      else
        format.json {render json: show.errors, status:403}
      end
    end
  end
  private
    def show_id_params
    	params.permit(:show_id)
    end
end
