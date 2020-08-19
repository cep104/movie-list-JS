class Movie < ApplicationRecord
    belongs_to :list
    validate do 
        movie_count_valid?
      end
    
      private
    
      def movie_count_valid?
        if self.list.movies.count >= 10
          self.errors.add(:list_max, "Max number of movies reached.")
        end
      end
end
