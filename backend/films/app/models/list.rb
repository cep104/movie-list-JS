class List < ApplicationRecord
    has_many :movies, dependent: :destroy
end
