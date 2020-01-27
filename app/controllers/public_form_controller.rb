class PublicFormController < ApplicationController
  include ActionView::Helpers::AssetUrlHelper
  include Webpacker::Helper

  layout 'public_form'
  after_action :allow_iframe, only: :show
  protect_from_forgery except: :embed

  def show
    @form = Form.find(params[:id])
  end

  def submit
    @form = Form.find(params[:id])

    unless @result = @form.results.create(result_params)
      return render json: { message: 'Something went wrong.' }, status: 422
    end

    ProcessResultJob.perform_async(@result.id)
    return render json: { message: 'Success' }, status: 200
  end

  def embed
    respond_to do |format|
      format.js { redirect_to asset_pack_url('embed.js') }
    end
  end

  private

  def result_params
    params.require(:result).permit(:payload, :values)
  end

  def allow_iframe
    response.headers.except! 'X-Frame-Options'
    #response.headers['X-Frame-Options'] = 'ALLOW-FROM https://the.end-user.com'
  end
end
