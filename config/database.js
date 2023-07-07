import mongoose from 'mongoose'

const connectDatabase = () => {
    mongoose.connect(process.env.DB_LOCAL_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: true
    })
        .then(con => {
            console.log(`database connected at host: ${con.connection.host}`)
        })
}

export default connectDatabase;