class PublicFormController < ApplicationController
  include ActionView::Helpers::AssetUrlHelper
  include Webpacker::Helper

  layout 'public_form'
  before_action :set_form, only: [:show, :submit]
  after_action :allow_iframe, only: :show
  protect_from_forgery except: :embed

  def show
    render :unpublished unless @form.published?
  end

  def submit
    raise(ActionController::InvalidAuthenticityToken) unless @form.published?

    unless @result = @form.results.create(result_params)
      return render json: { message: 'Something went wrong.' }, status: 422
    end

    ProcessResultJob.perform_later(@result.id)
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

  def set_form
    @form = Form.find(params[:id])
  end
end
