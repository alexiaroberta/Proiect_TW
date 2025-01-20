import express from 'express';
import db from '../dbConfig.js';
import { createFeedback,getFeedback } from '../dataAccess/FeedbackDa.js';

let feedbackRouter = express.Router();

feedbackRouter.route('/create').get(async(req,res) => {
    try{
        await db.sync({force: true})
        res.status(201).json({message: 'created'})
    } catch(err){
        console.warn(err.stack);
        res.status(500).json({'message': 'server error'});
    }
})

feedbackRouter.route('/feedback').post(async (req, res) => {
    res.status(201).json(await createFeedback(req.body))
})

feedbackRouter.route('/feedback').get(async (req, res) => {
    res.status(200).json(await getFeedback())
})

export default feedbackRouter;