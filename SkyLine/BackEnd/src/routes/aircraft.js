const express = require("express");
const router = express.Router();
const pool = require("../db");


// READ
router.get("/", async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM aircrafts');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/// Get a single aircraft by ID
router.get('/:id', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM aircrafts WHERE aircraft_id = $1', [req.params.id]);
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create a new aircraft
router.post('/', async (req, res) => {
    const { aircraft_id, name, model, capacity } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO aircrafts (aircraft_id, name, model, capacity) VALUES ($1, $2, $3, $4) RETURNING *',
            [aircraft_id, name, model, capacity]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update an aircraft
router.put('/:id', async (req, res) => {
    const { name, model, capacity } = req.body;
    try {
        const result = await pool.query(
            'UPDATE aircrafts SET name = $1, model = $2, capacity = $3 WHERE aircraft_id = $4 RETURNING *',
            [name, model, capacity, req.params.id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete an aircraft
router.delete('/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM aircrafts WHERE aircraft_id = $1', [req.params.id]);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
