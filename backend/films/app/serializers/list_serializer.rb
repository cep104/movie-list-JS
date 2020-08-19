class ListSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :movies 
  has_many :movies
end
