# app/models/target.rb
class Target < ApplicationRecord
  # この1行を追加することで、target.image という形で画像を扱えるようになります
  has_one_attached :image
end