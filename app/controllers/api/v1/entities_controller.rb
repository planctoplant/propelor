class Api::V1::EntitiesController < ApplicationController
  before_action :set_entity, only: [:show, :edit, :update, :destroy]

  # GET /entities
  # GET /entities.json
  def index
    @entities = Entity.all
    render json: @entities
  end

  # # GET /entities/1
  # # GET /entities/1.json
  # def show
  #   if @entity
  #     render json: @entity
  #   else
  #     render json: @entity.errors
  #   end
  # end

  # GET /entities/new
  def new
    @entity = Entity.new
  end

  # GET /entities/1/edit
  def edit
  end

  # POST /entities
  # POST /entities.json
  def create
    @entity = Entity.new(entity_params[:entity])
    
    if @entity.save
      render json: @entity
    else
      render json: @entity.errors
    end
  end

  # # PATCH/PUT /entities/1
  # # PATCH/PUT /entities/1.json
  # def update
  #   respond_to do |format|
  #     if @entity.update(beer_params)
  #       format.html { redirect_to @entity, notice: 'Entity was successfully updated.' }
  #       format.json { render :show, status: :ok, location: @entity }
  #     else
  #       format.html { render :edit }
  #       format.json { render json: @entity.errors, status: :unprocessable_entity }
  #     end
  #   end
  # end

  # DELETE /entities/1
  # DELETE /entities/1.json
  def destroy
    @entity.destroy
    
    render json: { notice: 'Entity was successfully removed.' }
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_entity
      @entity = Entity.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def entity_params
      params.slice(:entity).permit(entity: [:text, :ktype])
    end
end
