class ListSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :movies
  belongs_to :user
  has_many :movies
end
