import User from '../models/user.js';

import jwt from 'jsonwebtoken';

import asyncErrorHandler from './asyncErrorHandler.js';

export const isAuthenticated = asyncErrorHandler(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return next(new Error('Login first to access the resource', 401))
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decode._id)
    next()

})

export const authorizeRoles = role => (
    (req, res, next) => {
        if (req.user.role !== role) {
            return next(new Error(`Role ${req.user.role} is not allowed to access the resource`, 403))
        }
        next()
    }
)

