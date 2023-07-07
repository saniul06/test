import { Schema, model, ObjectId } from 'mongoose';

const showSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        max: [30, 'Your name can not exceed 30 characters']
    },
    runtime: {
        type: String,
        required: [true, 'Please add runtime']
    },
    imageUrl: {
        type: String,
        required: [true, 'Please add poster']
    },
    actors: [{
        type: Schema.Types.ObjectId,
        ref: 'Actor' // Reference to the User model
    }],
    director: {
        type: Schema.Types.ObjectId,
        ref: 'Director' // Reference to the User model
    },
    producer: {
        type: Schema.Types.ObjectId,
        ref: 'Producer' // Reference to the User model
    },
    releaseDate: {
        type: Date,
        required: [true, 'Please add release date']
    },
    reviews: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            rating: {
                type: Number,
                required: [true, 'Enter a rating']
            },
            content: {
                type: String,
                required: [true, 'Please leave a comment']
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default model('show', showSchema)