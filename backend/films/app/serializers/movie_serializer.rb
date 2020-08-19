class MovieSerializer < ActiveModel::Serializer
  attributes :id, :img_src, :title, :description, :rating, :list_id
  belongs_to :list
end
