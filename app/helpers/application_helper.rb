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
end
