export default (err, req, res, next) => {

    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error'

    console.log('error: ', err);

    res.status(err.statusCode).json({
        success: false,
        erorr: err,
        errorMessage: err.message,
        stack: err.stack
    })

}