class TextParser

    def self.date_builder(token:)
        overdue = token.sub(/!/, '')
        if overdue == 'today'
            overdue = Date.send(overdue)
        elsif overdue == 'tomorrow'
            overdue = Date.tomorrow
        elsif overdue.match?(/\d+/)
            quantity = overdue.match(/\d+/)[0].to_i
            time = overdue.match(/[^0-9]\w+/)[0]    
            # hackish, but works... basically doing 10.days.from_now, but having to use a string to send the integer part the command, thus Int.send('days').from_now.
            # ActiveRecord date helpers take care of the rest. Also return is implicit in ruby     
            overdue = quantity.send(time).from_now    
        end
    end

    def self.assign(token = nil)
        puts token
        if token
            username = token.sub(/@/, '')
            user = User.find_by(username: username)
            return user
        end
    end

    def self.parse(text:)
        parsed_results = {
            :category       => nil,
            :assignees      => [],
            :overdue        => nil
        }

        splitted = text.split(/\s/)
        splitted.each do |token|
            if token.match?(/@/)
                parsed_results[:assignees] << self.assign(token)
            elsif token.match?(/!/)
                parsed_results[:overdue] = self.date_builder(token: token)
            elsif token.match?(/#/)
                parsed_results[:category] = token.sub(/#/, '')    
            end
        end
        return parsed_results
    end
end
