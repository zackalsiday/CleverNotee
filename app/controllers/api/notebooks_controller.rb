class Api::NotebooksController < ApplicationController
  def create
    @notebook = Notebook.new(notebook_params)
    if @notebook.save
      render :show
    else
      render json: @notebook.errors.full_messages, status: 422 
    end
  end

 
  def update
    @notebook = Notebook.find(params[:id])
           
        if @notebook
          newOne = @notebook.update_attributes(notebook_params)
          render :show 
            
        else
            render json: @notebook.errors.full_messages, status: 422
        end
  end

    def destroy
    @notebook = Notebook.find_by(id: params[:id])
    @notebook.destroy 
    render :show 
  end

  def show
    @notebook = Notebook.find(params[:id])
    render :show 
  end

  def index
    @notebooks = current_user.notebooks
    render :index 
  end

  private 

  def notebook_params 
    params.require(:notebook).permit(:name, :user_id)
  end
end
