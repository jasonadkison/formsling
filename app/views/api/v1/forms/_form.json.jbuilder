json.(form, :id, :name, :url, :csp_host, :email_recipient, :created_at, :updated_at, :payload, :published)
json.public_url public_form_url(form.id)
json.embed_url embed_url(format: :js)
json.total_results form.results.size
