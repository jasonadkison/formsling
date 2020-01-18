json.(form, :id, :name, :created_at, :updated_at, :payload)
json.email_recipient [form.email_recipient, current_user.email].reject(&:blank?).first
json.public_url public_form_url(form.id)