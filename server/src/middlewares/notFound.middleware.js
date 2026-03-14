/**
 * 404 Not Found Middleware using ES Modules
 */
const notFound = (req, res, next) => {
  res.status(404).json({
    status: 'error',
    message: `Resource Not Found - ${req.originalUrl}`
  });
};

export default notFound;