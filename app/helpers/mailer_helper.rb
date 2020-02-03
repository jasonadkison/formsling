module MailerHelper

  def button(text, url)
    styles = [
      'font-size: 16px',
      'font-family: Helvetica, Arial, sans-serif',
      'color: #ffffff',
      'text-decoration: none',
      'color: #ffffff',
      'text-decoration: none',
      'border-radius: 3px',
      'padding: 15px 25px',
      'border: 1px solid #b656df',
      'display: inline-block'
    ]
    link_to text, url, style: styles.join(';'), target: '_blank', class: 'mobile-button'
  end

  def body_row(content = nil, align: :left, &block)
    styles = [
      'padding: 20px 0 0 0',
      'font-size: 16px',
      'line-height: 25px',
      'font-family: Helvetica, Arial, sans-serif',
      'color: #666666'
    ]
    content_tag :tr, nil, {}, false do
      content_tag :td, align: align, style: styles.join(';'), class: 'padding-copy' do
        block_given? ? block.call : content.html_safe
      end
    end
  end
end
