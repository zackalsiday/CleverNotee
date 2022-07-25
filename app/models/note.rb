class Note < ApplicationRecord
    validates :title, presence: true 
    validates :author_id, presence: true 
    validates :notebook_id, presence: true 

    belongs_to :author,
    foreign_key: :author_id,
    class_name: :User 

    belongs_to :notebook,
    foreign_key: :notebook_id,
    class_name: "Notebook"
    
    
end
