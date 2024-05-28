const express = require("express");
const router = express.Router();
const pool = require("../db");


// READ
router.get("/", async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM airports');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/// Get a single airport by ID
router.get('/:id', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM airports WHERE airport_id = $1', [req.params.id]);
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create a new airport
router.post('/', async (req, res) => {
    const { airport_id, airport_name, city, country, contact_phone, contact_email } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO airports (airport_id, airport_name, city, country, contact_phone, contact_email) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [airport_id, airport_name, city, country, contact_phone, contact_email]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update an airport
router.put('/:id', async (req, res) => {
    const { airport_name, city, country, contact_phone, contact_email } = req.body;
    try {
        const result = await pool.query(
            'UPDATE airports SET airport_name=$1, city=$2, country=$3, contact_phone=$4, contact_email=$5 WHERE airport_id=$6 RETURNING *',
            [airport_name, city, country, contact_phone, contact_email, req.params.id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete an airport
router.delete('/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM airports WHERE airport_id = $1', [req.params.id]);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;
