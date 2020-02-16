json.(form, :id, :name, :url, :csp_host, :email_recipient, :created_at, :updated_at, :payload, :published)
json.public_url public_form_url(form.id)
json.public_form_embed_url public_form_embed_url(form.id)
json.embed_js_url embed_js_url(format: :js)
json.total_results form.results.size
