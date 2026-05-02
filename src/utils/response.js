

const APIResponse = (res, statusCode, message, data = null, type = 'success') => {
  return res.status(statusCode).json({
    success: type === 'success',
    message,
    data
  });
};

const successResponse = (res, data, message, statusCode = 200) => {
  return APIResponse(res, statusCode, message, data, 'success');
};

const errorResponse = (res, message, statusCode = 500, data = null) => {
  return APIResponse(res, statusCode, message, data, 'error');
};

module.exports = {
  successResponse,
  errorResponse,
  APIResponse
};
