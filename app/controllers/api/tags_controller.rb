class Api::TagsController < ApplicationController
    def index
        @tags = current_user.tags
        render :index
    end

    def show
        @tag = Tag.find_by(id: params[:id])
        render :show
    end

    def create
        @tag = Tag.new(tag_params)
        
        if @tag.save
            render :show
        else
            render json: @tag.errors.full_messages, status: 422
        end
    end

    def update
        @tag = Tag.find_by(id: params[:id])
        
        if @tag
          newOne = @tag.update_attributes(tag_params)
            render :show
        else
            render json: @tag.errors.full_messages, status: 422
        end
    end

    def destroy
        @tag = Tag.find_by(id: params[:id])
        @tag.destroy 
        render :show 
    end

    private
    def tag_params
        params.require(:tag).permit(:name, :user_id)
    end
end
