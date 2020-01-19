class ResultController < ApplicationController
  def show
    respond_to do |format|
      format.pdf do
        result = Result.find(params[:id])
        @payload = Base64.decode64(result.payload);

        render(
          pdf: result.form.name.parameterize,
          disable_javascript: true,
          show_as_html: params.key?('debug'),
          #footer: { right: '[date] [time] - page [page] of [topage]', font_size: '6' },
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
