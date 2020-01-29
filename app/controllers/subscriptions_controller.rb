class SubscriptionsController < ApplicationController
  before_action :authenticate_user!

  def index; end

  def confirm
    return render :index unless %w(free standard).include?(params[:plan])
    return render :index if params[:plan] == 'free' && !current_user.active_subscription?
    return render :index if params[:plan] == 'standard' && current_user.active_subscription?

    @plan = params[:plan]
  end
end
