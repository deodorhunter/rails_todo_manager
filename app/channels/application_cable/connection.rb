module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user = current_user
      logger.debug "Current user using connection is: #{current_user}"
    end

    private

    def current_user
      # debugger
      return unless request.session[:token]

      crypt = ActiveSupport::MessageEncryptor.new(Rails.application.credentials.secret_key_base.byteslice(0..31))
      token = crypt.decrypt_and_verify request.session[:token]
      user_id = token.gsub('user-id:', '')
      User.find_by id: user_id
    rescue ActiveSupport::MessageVerifier::InvalidSignature
      nil
    end
  end
end
