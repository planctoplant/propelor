class Entity < ApplicationRecord
	belongs_to :sentence

	validates :text, presence: true
	validates :ktype, presence: true
end
