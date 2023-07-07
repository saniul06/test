import { Schema, model } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        max: [30, 'Your name can not exceed 30 characters']
    },
    email: {
        type: String,
        required: [true, 'Plsear provide your email address'],
        unique: true,
        validate: [validator.isEmail, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [4, 'Password must be longer than 3 characters'],
        select: false
    },
    role: {
        type: String,
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

// Encrypt password
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

// Compare Password
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

// create jwt token
userSchema.methods.getJwtToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            role: this.role
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_TIME })
}

export default model('user', userSchema)