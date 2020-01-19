class RenderPdf
  def self.for_result(result, renderer: WickedPdf.new)
    renderer.send(:pdf_from_string, result.html)
  end
end
