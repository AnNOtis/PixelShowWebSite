class CommentSerializer < ActiveModel::Serializer
  attributes :user_id,
             :show_id,
             :content,
             :created_at,
             :updated_at,
             :formatted_created_time,
             :time_ago

  has_one :user

end