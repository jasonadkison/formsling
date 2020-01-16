module Api
  module V1
    class FormsController < Api::Controller
      def index
        render json: current_user.forms
      end

      def show
        render json: current_user.forms.find(params[:id])
      end
    end
  end
end
