import express, { json, urlencoded } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import auth from './routes/authRoutes.js';
import errorMiddleware from './middlewares/errorHandler.js'
const app = express()

app.use(cors());
app.use(morgan('dev'));
app.use(json())
app.use(urlencoded({ extended: true }));
app.use(cookieParser())
app.use('/api/v1', auth);

app.get('/health', (req, res) => {
    res.status(200).json({ success: true })
})

//handle errors
app.use(errorMiddleware);

export default app;
