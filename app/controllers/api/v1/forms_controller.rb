module Api
  module V1
    class FormsController < Api::Controller
      def index
        render json: current_user.forms
      end

      def show
        render json: current_user.forms.find(params[:id])
      end

      def create
        @form = current_user.forms.create(form_params)

        return render json: @form, status: 200 if @form.persisted?

        render json: { message: 'Could not create the form.' }, status: 422
      end

      def update
        @form = current_user.forms.find(params[:id])

        return render json: @form, status: 200 if (@form.update_attributes(form_params))

        render json: { message: 'Could not save the form.' }, status: 422
      end

      private

      def form_params
        params.require(:form).permit(:name, :email_recipient, :payload)
      end
    end
  end
end
