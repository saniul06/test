import asyncErrorHandler from '../middlewares/asyncErrorHandler.js'
import User from '../models/user.js'
import ErrorHandler from '../utils/Errors.js'
import sendToken from '../utils/jwtToken.js'

export const registerUser = asyncErrorHandler(async (req, res, next) => {
    const { name, email, password, role } = req.body

    if (!name || !email || !password) {
        return next(new ErrorHandler('Please fill the form', 400))
    }

    const data = { name, email, password }

    if (role) data.role = role;

    const user = await User.create(data);

    sendToken(user, 201, res)
})

export const loginUser = asyncErrorHandler(async (req, res, next) => {
    const { email, password } = req.body;
    console.log(email, password);

    if (!email || !password) {
        return next(new ErrorHandler('Please enter email & password', 400))
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return next(new ErrorHandler('Invalid email or password', 401))
    }

    const isPasswordMatched = await user.comparePassword(password)

    if (!isPasswordMatched) {
        return next(new ErrorHandler('Invalid email or password', 401))
    }

    sendToken(user, 200, res)
})

export const logoutUser = asyncErrorHandler(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'Logout successfully'
    })
})