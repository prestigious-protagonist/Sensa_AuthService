const UserService = require("../services/user-service");
const AppErrors = require("../utils/error-handler");
const ClientError = require("../utils/client-error");
const { StatusCodes } = require('http-status-codes');
const { ClerkExpressRequireAuth } = require('@clerk/express');

this.UserService = new UserService();

// isAuthenticated function using Clerk middleware
const isAuthenticated = async (req, res) => {
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: "No token provided" });
    }

    try {
        // Here we verify the session using ClerkExpressRequireAuth middleware
        const session = await ClerkExpressRequireAuth(req, res);  // This middleware will validate the session for us

        if (session && session.status === 'active') {
            return res.status(StatusCodes.OK).json({
                message: "Authenticated",
                userId: session.userId,
                sessionId: session.id,
            });
        } else {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Session not active" });
        }
    } catch (error) {
        console.log(error)
        if (!(error instanceof AppErrors || error instanceof ClientError)) {
            error = new AppErrors();
        }

        return res.status(error.statusCode).json({
            err: error.name,
            message: error.message,
            data: error.explanation,
            success: error.success,
        });
    }
};

// isAdmin function
const isAdmin = async (req, res) => {
    try {
        const response = await this.UserService.isAdmin(req.params.userId);
        if (!response) {
            throw new Error("User not an admin");
        }

        return res.status(StatusCodes.OK).json({
            message: "User is an Admin.",
            data: "UID: " + req.params.userId,
            success: true,
        });
    } catch (error) {
        if (!(error instanceof AppErrors || error instanceof ClientError)) {
            error = new AppErrors();
        }

        return res.status(error.statusCode).json({
            err: error.name,
            message: error.message,
            data: error.explanation,
            success: error.success,
        });
    }
};

module.exports = {
    isAuthenticated,
    isAdmin,
};
