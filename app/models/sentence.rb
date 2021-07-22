class Sentence < ApplicationRecord
	has_many :entities

	validates :content, presence: true
end
