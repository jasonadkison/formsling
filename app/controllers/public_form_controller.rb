class PublicFormController < ApplicationController
  layout 'public_form'

  def show
    @form = Form.find(params[:id])
  end

  def submit
    @form = Form.find(params[:id])

    return render json: { message: 'Success' }, status: 200 if @form.results.create(result_params)

    render json: { message: 'Something went wrong.' }, status: 422
  end

  private

  def result_params
    params.require(:result).permit(:payload)
  end
end
