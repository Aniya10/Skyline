const express = require("express");
const router = express.Router();
const pool = require("../db");


// READ
router.get("/", async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM airlines');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/// Get a single airline by ID
router.get('/:id', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM airlines WHERE airline_id = $1', [req.params.id]);
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create a new airline
router.post('/', async (req, res) => {
    const { airline_id, airline_name, country, address } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO airlines (airline_id, airline_name, country, address) VALUES ($1, $2, $3, $4) RETURNING *',
            [airline_id, airline_name, country, address]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update an airline
router.put('/:id', async (req, res) => {
    const { airline_name, country, address } = req.body;
    try {
        const result = await pool.query(
            'UPDATE airlines SET airline_name = $1, country = $2, address = $3 WHERE airline_id = $4 RETURNING *',
            [airline_name, country, address, req.params.id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete an airline
router.delete('/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM airlines WHERE airline_id = $1', [req.params.id]);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;


