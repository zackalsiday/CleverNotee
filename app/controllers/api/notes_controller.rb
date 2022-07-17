class Api::NotesController < ApplicationController
  def index
    @notes = Note.all 
    render :index
  end

  def show
    @note = Note.find(params[:id])
    render :show
  end

  def create
    @note = Note.new(note_params)
    if @note.save 
      render :show
    else 
      render json: @note.errors.full_messages, status: 422
    end
  end

  def destroy
    @note = Note.find_by(id: params[:id])
    @note.destroy 
    render :show 
  end

  def update
    @note = Note.find(params[:id])
           
        if @note
          newOne = @note.update_attributes(note_params)
          render :show 
            
        else
            render json: @note.errors.full_messages, status: 422
        end
  end

     private
    def note_params
        params.require(:note).permit(:title, :content, :author_id, :notebook_id)
    end

end
