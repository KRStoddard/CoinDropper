class User < ApplicationRecord
    has_many :games
    validates :username, length: { minimum: 1 }

    #total_score calculates the average score per game of a user instance

    def total_score
        sum = self.games.sum{|game|game.points}
        sum.to_i / self.games.count
    end

    #self.leaders is a class method that sorts by and shows all user's average scores
    
    def self.leaders
        users = self.all.select{|user| user.games.count > 0}
        users.map{|user|"#{user.username}, #{user.total_score}"}.sort_by{|user|(user.split(', ')[1]).to_i}.reverse
    end
    
end
