class Me::CommentsController < ApplicationController
  before_action :require_login
	def create
		@comment = Show.find(params[:id]).comments.new(comment_params)
  	@comment.user_id = current_user.id
		respond_to	do |format|
			if @comment.save
				format.json {render json: @comment, serializer: CommentSerializer}
			else
				format.json {render json: @comment.errors}
			end
		end
	end
  private
    def comment_params
      params.permit(:content)
    end
end
