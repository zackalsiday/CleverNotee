class CreateNotes < ActiveRecord::Migration[5.2]
  def change
    create_table :notes do |t|
      t.string :title, null: false 
      t.string :content
      t.integer :author_id, null: false 
      t.integer :notebook_id, default: 0, null: false
      t.timestamps
    end
    add_index :notes, :author_id, unique: true
    add_index :notes, :notebook_id, unique: true
    add_index :notes, :title, unique: true 
  end
end
