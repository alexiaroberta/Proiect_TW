import express from 'express';
import db from '../dbConfig.js';
import { createActivitate, getActivitate, getActivitateId, updateActivitate, deleteActivitate} from '../dataAccess/ActivitateDa.js';

let activitateRouter = express.Router();

activitateRouter.route('/create').get(async(req,res) => {
    try{
        await db.sync({force: true})
        res.status(201).json({message: 'created'})
    } catch(err){
        console.warn(err.stack);
        res.status(500).json({'message': 'server error'});
    }
})

activitateRouter.route('/activitate').post(async (req, res) => {
    res.status(201).json(await createActivitate(req.body))
})

activitateRouter.route('/activitate').get(async (req, res) => {
    res.status(200).json(await getActivitate())
})

activitateRouter.route('/activitate/:id').get(async (req, res) => {
    let activitate = await getActivitateId(req.params.id);
    if (activitate)
        res.status(200).json(activitate)
    else
        res.status(400).json({"Error": "Not exist"})
}) 

activitateRouter.route('/activitate/:id').put(async (req, res) => {
    let ret = await updateActivitate(req.params.id, req.body);

    if (ret.error)
        res.status(400).json(ret.msg);
    else
        res.status(200).json(ret.obj)
})

activitateRouter.route('/coduri').get(async (req, res) => {
    try {
        const activitati = await getActivitate();
        
        const coduri = activitati.map((activitate) => activitate.ActivitateCodUnic);
        
        res.status(200).json(coduri);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

activitateRouter.route('/activitate/:id').delete(async (req, res) => {
    let ret = await deleteActivitate(req.params.id);

    if (ret.error)
        res.status(400).json(ret.msg);
    else
        res.status(200).json(ret.obj)
})

export default activitateRouter;