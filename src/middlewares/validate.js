const Joi = require('joi');

const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const messages = error.details.map(detail => detail.message);
      const validationError = new Error('Validation failed');
      validationError.name = 'ValidationError';
      validationError.details = messages;
      validationError.statusCode = 400;
      return next(validationError);
    }
    req.body = value;
    next();
  };
};

const validateQuery = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.query, { abortEarly: false });
    if (error) {
      const messages = error.details.map(detail => detail.message);
      const validationError = new Error('Query validation failed');
      validationError.name = 'ValidationError';
      validationError.details = messages;
      validationError.statusCode = 400;
      return next(validationError);
    }
    req.query = value;
    next();
  };
};

const validateParams = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.params, { abortEarly: false });
    if (error) {
      const messages = error.details.map(detail => detail.message);
      const validationError = new Error('Parameter validation failed');
      validationError.name = 'ValidationError';
      validationError.details = messages;
      validationError.statusCode = 400;
      return next(validationError);
    }
    req.params = value;
    next();
  };
};

module.exports = {
  validate,
  validateQuery,
  validateParams
};
