class PublicFormController < ApplicationController
  include ActionView::Helpers::AssetUrlHelper
  include Webpacker::Helper

  layout 'public_form'
  before_action :set_form, only: [:show, :submit]
  protect_from_forgery except: :embed

  def show
    # Content Security Policy denies iframe embeds by default.

    if Rails.env.development?
      # allow access in dev
      response.headers.except! 'X-Frame-Options'
    else
      # allow access to the configured host only when set
      unless @form.csp_host.blank?
        response.headers['X-Content-Security-Policy'] = "frame-ancestors #{@form.csp_host}"
        response.headers['Content-Security-Policy'] = "frame-ancestors #{@form.csp_host}"
      end
    end

    render :unpublished unless @form.published?

    ahoy.track 'form.view', id: @form.id, name: @form.name
  end

  def submit
    raise(ActionController::InvalidAuthenticityToken) unless @form.published?

    @result = @form.results.new(result_params)

    unless verify_recaptcha(response: params[:recaptcha_token], model: @result, secret_key: Rails.application.credentials.google_recaptcha[:secret_key]) && @result.save
      ahoy.track 'form.error', id: @form.id, name: @form.name
      return render json: { message: 'Something went wrong.', errors: @result.errors.full_messages }, status: 422
    end

    ProcessResultJob.perform_later(@result.id)
    ahoy.track 'form.success', id: @form.id, name: @form.name
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

  def set_form
    @form = Form.find(params[:id])
  end
end
