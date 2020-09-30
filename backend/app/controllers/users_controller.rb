class UsersController < ApplicationController

    def index
        users = User.leaders[0,5] 

        render json: users
    end

    def create
        user = User.find_or_create_by({username: params[:username]})

        render json: user 
    end

    def destroy
        user = User.find(params[:id])
        user.destroy

        render json: {message: 'Successfully deleted!'}
    end

end
