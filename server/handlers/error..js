function errorHandler(error, request, response, next) {
  return response.status(error.status || 500).json({
    error: {
      message: error.message || "OOps there was an error - please check in later"
    }
  })
}

module.exports = errorHandler;