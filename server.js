import express, { json, urlencoded } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import connectDatabase from './config/database.js';
import dotenv from 'dotenv'
const app = express()

app.use(cors());
app.use(morgan('dev'));
app.use(json())
app.use(urlencoded({ extended: true }));
app.use(cookieParser())

dotenv.config({ path: './config/dev.env' })

connectDatabase();

app.listen(process.env.PORT, () => {
    console.log(`Server started at port ${process.env.PORT}`)
})

