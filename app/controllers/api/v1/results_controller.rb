module Api
  module V1
    class ResultsController < Api::Controller
      def index
        relation = current_user.admin? ? Form.all : current_user.forms
        render json: relation.find(params[:form_id]).results
      end
    end
  end
end
