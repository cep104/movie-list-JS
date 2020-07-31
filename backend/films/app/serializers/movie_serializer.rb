class MovieSerializer
  include FastJsonapi::ObjectSerializer
  attributes :img_src, :title, :description, :rating
end
