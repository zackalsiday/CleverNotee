class RemoveUniqueFromNotesIndex < ActiveRecord::Migration[5.2]
  def change
    remove_index :notes, :author_id
    remove_index :notes, :notebook_id
    remove_index :notes, :title
    add_index :notes, :author_id 
    add_index :notes, :notebook_id
    add_index :notes, :title 
  end
end
