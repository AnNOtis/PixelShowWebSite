json.comment do
  json.(@comment, :user_id, :show_id, :content, :created_at, :updated_at, :formatted_created_time, :time_ago)

  json.user do
    json.(@comment.user, :id, :name)
  end
end
