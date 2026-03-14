/**
 * Generic Validation Middleware using ES Modules
 * @param {Object} schema - A validation schema (e.g., Joi)
 */
const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, { 
    abortEarly: false, 
    stripUnknown: true 
  });

  if (error) {
    const errorMessage = error.details
      .map((details) => details.message)
      .join(', ');
    
    return res.status(400).json({ 
      status: 'error',
      message: errorMessage 
    });
  }

  // Overwrite req.body with the sanitized version
  req.body = value;
  next();
};

export default validate;