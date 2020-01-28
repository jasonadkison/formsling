class RenderPdf
  def self.for_result(result, renderer: WickedPdf.new)
    options = {
      header: {
        left: result.form.name,
        center: "FormSling.com Generated Document",
        right: '[page] of [topage]',
        font_size: 10
      },
      footer: {
        left: result.form.name,
        center: "FormSling.com Generated Document",
        right: '[page] of [topage]',
        font_size: 10
      },
      grayscale: true,
      extra: '--no-print-media-type --disable-forms --disable-javascript'
    }
    renderer.send(:pdf_from_string, result.pdf_html, options)
  end
end
