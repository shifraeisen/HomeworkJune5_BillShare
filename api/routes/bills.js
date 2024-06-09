const router = require('express').Router();
const db = require('../db');

router.post('/add', async (req, res) => {
    await db.addBill(req.body);
    res.json({status: 'ok'});
});

router.get('/getAll', async (req, res) => {
    res.json(await db.getBills());
});

router.get('/getDetails', async (req, res) => {  
    res.json(await db.getBillDetails(req.query.id));
});

module.exports = router;