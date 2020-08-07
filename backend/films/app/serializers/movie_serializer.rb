class MovieSerializer < ActiveModel::Serializer
  attributes :id, :img_src, :title, :description, :rating
  belongs_to :list
end
