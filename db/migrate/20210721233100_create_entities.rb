class CreateEntities < ActiveRecord::Migration[6.1]
  def change
    create_table :entities do |t|
      t.timestamps

      t.string :text, index: true
      t.string :ktype, index: true
      t.string :color
    end

    add_reference :entities, :sentence, index: true
  end
end
