class Me::CommentsController < ApplicationController
  before_action :require_login
	def create
		@comment = Show.find(params[:id]).comments.new(comment_params)
  	@comment.user_id = current_user.id
		@comment.save
	end
  private
    def comment_params
      params.permit(:content)
    end
end
