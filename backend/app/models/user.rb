class User < ApplicationRecord
    has_many :games

    def total_score
        self.games.sum{|game|game.points}
    end

    def self.leaders
        self.all.map{|user|"#{user.username}, #{user.total_score}"}.sort_by{|user|user.split(', ')[1]}.reverse
    end
end
