import { Schema, model } from 'mongoose';

const actorSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        max: [30, 'Actor name can not exceed 30 characters']
    }
})


export default model('actor', actorSchema)