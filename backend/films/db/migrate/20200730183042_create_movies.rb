class CreateMovies < ActiveRecord::Migration[6.0]
  def change
    create_table :movies do |t|
      t.string :img_src
      t.string :title
      t.text :description
      t.integer :rating
      t.references :lists, null: false, foreign_key: true
      t.timestamps
    end
  end
end
