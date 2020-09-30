class User < ApplicationRecord
    has_many :games

    def total_score
        sum = self.games.sum{|game|game.points}
        sum.to_i / self.games.count
    end

    def self.leaders
        users = self.all.select{|user| user.games.count > 0}
        users.map{|user|"#{user.username}, #{user.total_score}"}.sort_by{|user|user.split(', ')[1]}.reverse
    end
    
end
