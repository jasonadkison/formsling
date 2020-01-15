module Api
  module V1
    class FormsController < Api::Controller
      def index
        if user_signed_in?
          render json: current_user.forms
        else
          render json: {}, status: 401
        end
      end
    end
  end
end
