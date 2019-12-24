class ApplicationController < ActionController::Base
    def current_user
        token = request.headers["Authorization"].to_s
        email = Base64.decode64(token)
        puts email
        User.find_by(email: email)
    end
end
