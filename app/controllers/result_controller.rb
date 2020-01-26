class ResultController < ApplicationController
  before_action :authenticate_user!

  def show
    relation = current_user.admin? ? Result.all : Result.where(form_id: current_user.forms.pluck(:id))
    @result = relation.find(params[:id])
    respond_to do |format|
      format.html { render inline: @result.html }
      format.pdf do
        pdf = RenderPdf.for_result(@result)
        Tempfile.create do |t|
          t.binmode
          t.write(pdf)
          t.rewind
          t.close
          send_data File.open(t.path, 'rb').read, type: 'application/pdf', filename: @result.pdf_filename
        end
      end
    end
  end

end
