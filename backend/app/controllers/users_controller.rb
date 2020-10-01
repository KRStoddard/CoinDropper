class UsersController < ApplicationController

    #index is used to render the top five average scorers
    #it returns that information to the frontend in json format

    def index
        users = User.leaders[0,5] 

        render json: users
    end

    #create finds or creates a user based on username sent from frontend form
    #it returns the user info in json format

    def create
        user = User.find_or_create_by({username: params[:username]})

        render json: user 
    end


end
