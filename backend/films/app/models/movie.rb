class Movie < ApplicationRecord
    belongs_to :list
    has_one_attached :image_src
    validates :rating, numericality: { less_than_or_equal_to: 10 }
    validates :title, presence: true
    before_validation :capitalize_title
    validate do 
        movie_count_valid?
        not_a_duplicate?
      end
    
      private
    
      def movie_count_valid?
        if self.list.movies.count >= 10
          self.errors.add(:list_max, "Max number of movies reached.")
        end
      end

      def not_a_duplicate?
        movie = Movie.find_by(title: title, list_id: list_id)
        if !!movie && movie != self
          errors.add(:list_max, 'this movie has already been added to this list.')
        end
      end

      def capitalize_title
        title.capitalize!
      end

      
end
