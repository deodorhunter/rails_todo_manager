# app/graphql/mutations/sign_out_mutation.rb

module Mutations
    class SignOutMutation < Mutations::BaseMutation
    #   argument :email, Types::AuthProviderEmailInput, required: true

      argument :token, String, required: true
      field :success, Boolean, null: true

      def resolve(token: nil)
        debugger
        # basic validation
        # return unless email

        # user = User.find_by!(email: email[:email])

        # ensures we have the correct user
        return unless context[:session][:token] == token
        # return unless user.authenticate(email[:password])

        # use Ruby on Rails - ActiveSupport::MessageEncryptor, to build a token
        # crypt = ActiveSupport::MessageEncryptor.new(Rails.application.credentials.secret_key_base.byteslice(0..31))
        # token = crypt.encrypt_and_sign("user-id:#{ user.id }")
        context[:session].delete('token')
        { success: true}
        # { user: user, token: token }
      end
    end
  end
