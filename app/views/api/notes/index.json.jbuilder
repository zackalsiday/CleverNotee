

json.key_format! camelize: :lower

@notes.each do |note|
    json.set! note.id do
        json.partial! 'note', note: note
    end
end