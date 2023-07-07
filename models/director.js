import { Schema, model } from 'mongoose';

const directorSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        max: [30, 'Actor name can not exceed 30 characters']
    }
})


export default model('director', directorSchema)