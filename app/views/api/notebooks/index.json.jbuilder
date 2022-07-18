
json.key_format! camelize: :lower

@notebooks.each do |notebook|
    json.set! notebook.id do
        json.partial! 'notebook', notebook: notebook
    end
end