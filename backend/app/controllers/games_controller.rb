class GamesController < ApplicationController

    def index
        games = Game.all 

        render json: games
    end

    def create
        user_id = User.find_by(username: params[:user]).id 
        game = Game.create(points: 0, user_id: user_id)

        render json: game 
    end

    def update
        game = Game.find(params[:id]) 
        game.update(points: params[:points])
    end
    
end
