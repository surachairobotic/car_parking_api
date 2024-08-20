const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log the error stack trace for debugging
    res.status(500).json({ message: 'An unexpected error occurred' }); // Send a generic error response
};

module.exports = errorHandler;
