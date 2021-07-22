require 'json/next'

# Sentence.create!({content: "Apple is looking at buying U.K startup for $1 billion."})
# Sentence.create!({content: "Regional funds with exposure to United States and outperform equity market over 3 years"})

# Entities.create!({text: "Apple", ktype: "ORG"})
# Entities.create!({text: "U.K", ktype: "GPE"})
# Entities.create!({text: "$1 billion", ktype: "MONEY"})

# Entities.create!({text: "Regional funds", ktype: "THEME"})
# Entities.create!({text: "United States", ktype: "GPE"})
# Entities.create!({text: "equity market", ktype: "THEME"})
# Entities.create!({text: "3 year", ktype: "TIME"})


file = File.read(Rails.root.join('db/seeds/fixtures/entries'))
entries = HANSON.parse(file)

entries.each do |entry|
	sentence = Sentence.create!({
		content: entry["sentence"]
	})

	entry["entities"] = entry["entities"] || []
	entry["entities"].each do |entity|
		sentence.reload.entities.create!({text: entity["text"], ktype: entity["type"]})
	end
end
