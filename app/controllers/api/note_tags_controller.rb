class Api::NoteTagsController < ApplicationController

    def index
        @note_tags = NoteTag.all
        render :index
    end

    def show
        @note_tag = NoteTag.find_by(id: params[:id])
        render :show
    end

   def destroy
        @note_tag = NoteTag.find_by(id: params[:id])

        if @note_tag.destroy
            render :show
        else
            render json: @note_tag.errors.full_messages, status: 422
        end
    end


    def update
        @note_tag = NoteTag.find_by(id: params[:id])

        if @note_tag.update(note_tag_params)
            render :show
        else
            render json: @note_tag.errors.full_messages, status: 422
        end
    end


    def create
        @note_tag = NoteTag.new(note_tag_params)

        if @note_tag.save
            render :show
        else
            render json: @note_tag.errors.full_messages, status: 422
        end
    end

    def note_tag_params
        params.require(:note_tag).permit(:note_id, :tag_id)
    end
end
