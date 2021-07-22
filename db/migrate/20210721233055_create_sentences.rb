class CreateSentences < ActiveRecord::Migration[6.1]
  def change
    create_table :sentences do |t|
      t.timestamps

      t.string :content, index: true
    end
  end
end
