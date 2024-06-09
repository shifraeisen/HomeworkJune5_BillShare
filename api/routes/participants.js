const router = require('express').Router();
const db = require('../db');

router.get('/getAll', async (req, res) => {
    return res.json(await db.getParticipants());
});

router.post('/add', async (req, res) => {
    await db.addPerson(req.body);
    res.json({status: 'ok'});
});

module.exports = router;