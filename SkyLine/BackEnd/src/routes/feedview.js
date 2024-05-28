const express = require('express');
const router = express.Router();
const pool = require('../db'); 

router.get('/', async (req, res) => {
    try {
        const result = await pool.query(`
        SELECT * FROM airline_feedback_summary;
        `);
        res.render('feedview', { feedbackData: result.rows });
    } catch (error) {
        console.error('Error fetching top destinations:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
