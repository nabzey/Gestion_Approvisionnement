const response = require('../utils/response');

class ErrorHandler {
  static handle(error, req, res, next) {
    console.error('❌ Error:', {
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      path: req.path,
      method: req.method,
      timestamp: new Date().toISOString()
    });

    if (error.name === 'ValidationError') {
      return response.errorResponse(res, error.message, 400);
    }

    if (error.name === 'UnauthorizedError') {
      return response.errorResponse(res, 'Unauthorized access', 401);
    }

    if (error.name === 'ForbiddenError') {
      return response.errorResponse(res, 'Access denied', 403);
    }

    if (error.message && error.message.includes('not found')) {
      return response.errorResponse(res, error.message, 404);
    }

    if (error.code === '23505') {
      return response.errorResponse(res, 'Duplicate entry', 409);
    }

    const statusCode = error.statusCode || error.status || 500;
    return response.errorResponse(res, error.message || 'Internal server error', statusCode);
  }

  static asyncHandler(fn) {
    return (req, res, next) => {
      Promise.resolve(fn(req, res, next)).catch(next);
    };
  }
}

module.exports = ErrorHandler;
