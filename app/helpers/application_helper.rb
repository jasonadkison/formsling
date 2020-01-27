module ApplicationHelper
  def css_class_for_flash_type(type)
    case type
    when 'success'
      'is-success'
    when 'error'
      'is-danger'
    when 'alert'
      'is-warning'
    when 'notice'
      'is-info'
    else
      type.to_s
    end
  end

  def production_pdf_pack_tag(asset)
    file_path = Rails.root.join('public', asset_pack_path(asset))
    content = File.read(file_path)
    if asset.include?('.js')
      "<script type='text/javascript'>#{content}</script>".html_safe
    else
      "<style type='text/css'>#{content}</style>".html_safe
    end
  end
end
