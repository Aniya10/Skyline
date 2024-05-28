

const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/flight-revenue", async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM flight_revenue_report');
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching flight revenue report:', err);
        res.status(500).json({ error: err.message });
    }
});

router.get("/airline-revenue", async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM airline_revenue_report');
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching airline revenue report:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;

