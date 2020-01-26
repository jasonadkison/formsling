class RenderPdf
  def self.for_result(result, renderer: WickedPdf.new)
    renderer.send(:pdf_from_string, result.pdf_html)
  end
end
