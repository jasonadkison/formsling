class PublicFormController < ApplicationController
  def show
    @form = Form.find(params[:id])
  end
end
