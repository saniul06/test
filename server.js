import app from './app.js'
import dotenv from 'dotenv'

import connectDatabase from './config/database.js'

process.on('uncaughtException', err => {
    console.log(`the error is: ${err.message}`)
    console.log(`the error is: ${err.stack}`)
    process.exit(1)

})

dotenv.config({ path: './config/dev.env' })

connectDatabase()

const server = app.listen(process.env.PORT, () => {
    console.log(`server started at port ${process.env.PORT}`)
})

process.on('unhandledRejection', err => {
    console.log(`the unhandle error is ${err.message}`)
    console.log(`the unhandle error is ${err.stack}`)
    console.log('sutting down server')
    server.close(() => process.exit(1))
})
