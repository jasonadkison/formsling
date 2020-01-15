module Api
  class Controller < ApplicationController
    before_action :authenticate_user!
  end
end
