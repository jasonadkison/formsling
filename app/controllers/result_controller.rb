class ResultController < ApplicationController
  before_action :check_perms

  # This endpoint is used for debugging pdfs only in development
  def show
    respond_to do |format|
      format.pdf do
        result = Result.find(params[:id])
        pdf = RenderPdf.for_result(result)
        Tempfile.create do |t|
          t.binmode
          t.write(pdf)
          t.rewind
          t.close
          send_data File.open(t.path, 'rb').read, type: 'application/pdf', filename: result.pdf_filename
        end
      end
    end
  end

  private

  # !TODO: would be useful if this could use some sort of token for debugging in production
  def check_perms
    raise ActionController::RoutingError.new('Not Found') unless Rails.env.development?
  end
end
