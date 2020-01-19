# Processes a Result by generating the pdf and emailing it to the recipient.
#
# !TODO: store the file somewhere besides local filesystem
class ProcessResult
  def self.call(result)
    new(result).call
  end

  def initialize(result)
    @result = result
  end

  def call
    Result.transaction do
      raise "Already processed" if @result.processed?

      # !TODO: do something with the pdf file (upload to s3)
      pdf = RenderPdf.for_result(@result)

      @result.update_attributes!(processed: true)

      # !TODO: send the email attachment
    end
  end
end
