class ProcessResultJob < ApplicationJob
  def perform(result_id)
    result = Result.where(processed: false).find(result_id)

    pdf = RenderPdf.for_result(result)
    pdf_file = Tempfile.new([result.pdf_filename, '.pdf'])
    pdf_file.binmode
    pdf_file.write(pdf)
    pdf_file.rewind

    # mail will raise exception if it fails
    UserMailer.result_processed(result, pdf_file).deliver_now

    result.update(processed: true)
  end
end
