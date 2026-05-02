const notFound = (req, res, next) => {
  const error = new Error(`Resource not found: ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};

module.exports = notFound;
