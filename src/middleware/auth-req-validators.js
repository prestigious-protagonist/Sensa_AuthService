
const ClientError = require('../utils/client-error');
const {StatusCodes} = require('http-status-codes')


const validateUserAuth = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new ClientError({
                name: "ValidationError",
                message: "Invalid Request",
                explanation: "Email or password is missing from the request body.",
                statusCode: StatusCodes.BAD_REQUEST, // Use 400 for validation errors
            });
        }
        next();
    } catch (error) {
        next(error);  // Forward the error to the error handler
    }
};



const validateIsAdminRequest = (req, res, next) => {
    const { userId } = req.params;
    if (!userId) {
        throw new ClientError({
            name: "ValidationError",
            message: "Invalid Request",
            explanation: "field userId is missing from the request body.",
            statusCode: StatusCodes.BAD_REQUEST,
        });
    }
    next();
};




module.exports = {
    validateUserAuth,
    validateIsAdminRequest,
}