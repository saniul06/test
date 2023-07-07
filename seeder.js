import mongoose from 'mongoose';
import Actor from './models/actor.js';
import Director from './models/director.js'
import Producer from './models/producer.js'
import { database_url } from './utils/constants.js'
import connectDatabase from './config/database.js';

mongoose.connect(database_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true
})
    .then(con => {
        console.log(`database connected at host: ${con.connection.host}`)
        seed()
    })

const seed = async () => {
    try {
        const actors = [
            { name: 'John Doe', age: 25 },
            { name: 'Jane Smith', age: 30 },
            // ...
        ];
        await Actor.deleteMany()
        await Director.deleteMany()
        await Producer.deleteMany()

        await Actor.insertMany(actors)
        await Director.insertMany(actors)
        await Producer.insertMany(actors)
        console.log('inserted')

    } catch (err) {
        process.exit()
    }
}


