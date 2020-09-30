class GamesController < ApplicationController

    def create
        game = Game.find_or_create_by(points: params[:points].to_i, user_id: params[:user_id].to_i)

        render json: game
    end
    
end
