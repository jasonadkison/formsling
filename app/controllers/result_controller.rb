class ResultController < ApplicationController
  def show
    respond_to do |format|
      format.pdf do
        result = Result.find(params[:id])
        filename = [result.form.name, result.form.id, result.id, "formsling", Time.zone.now.to_i].join(' ').parameterize

        @payload = Base64.decode64(result.payload);
        @result = result
        @form = result.form

        render(
          pdf: filename,
          disable_javascript: true,
          show_as_html: params.key?('debug'),
          header: { center: 'Powered by FormSling.com', line: true },
          #layout: 'pdf',
          #template: 'result/show.pdf.erb',
          #save_to_file: Rails.root.join('tmp', 'test.pdf'),
          #window_status: 'pdf4me',
          #raise_on_all_errors: true,
          #javascript_delay: 5000,
          #log_level: 'info',
          #quiet: false,
          #extra: '--enable-forms'
        )
      end
    end
  end
end
