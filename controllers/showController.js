import Show from '../models/show.js';
import asyncErrorHandler from '../middlewares/asyncErrorHandler.js';
import ErrorHandler from '../utils/Errors.js';
import sendToken from '../utils/jwtToken.js';

export const createNewShow = asyncErrorHandler(async (req, res, next) => {
    const { name, runtime, imageUrl, actors, director, producer, releaseDate } = req.body

    if (!name || !runtime || !imageUrl || !actors || !director || !producer || !releaseDate) {
        return next(new ErrorHandler('Please fill out all fileds', 401))
    }

    req.body.user = req.user._id
    const product = await Show.create(req.body);
    res.status(201).json({
        success: true,
        message: 'Show created successfully'
    })
})

export const getShows = asyncErrorHandler(async (req, res, next) => {
    const { lastId } = req.query;
    const query = {};
    const limit = 10;
    if (lastId) query['_id'] = { $lt: lastId };

    const shows = await Show
        .find({ ...query })
        .sort({ _id: -1 })
        .limit(limit)
        .lean();
    res.status(200).json({
        success: true,
        shows,
    })

})

