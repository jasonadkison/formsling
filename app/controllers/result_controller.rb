class ResultController < ApplicationController
  layout 'result'

  def show
    @result = Result.find(params[:id])

    raise 'Empty result payload' if @result.payload.blank?
  end
end
