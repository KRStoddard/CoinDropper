class GamesController < ApplicationController

    #game index loads all games as json largely for debugging purposes

    def index
        games = Game.all 

        render json: games
    end

    #create creates a new game instance using the username sent by the front-end form
    #it returns the game to the frontend in the form of json

    def create
        user_id = User.find_by(username: params[:user]).id 
        game = Game.create(points: 0, user_id: user_id)

        render json: game 
    end

    #update will update the points earned in the game
    #the information is sent over automatically by the game when it ends
    
    def update
        game = Game.find(params[:id]) 
        game.update(points: params[:points])
    end
    
end
