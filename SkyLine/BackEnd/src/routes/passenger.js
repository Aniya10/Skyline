const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/", async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM passengers');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM passengers WHERE passenger_id = $1', [req.params.id]);
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

/*router.post("/", async (req, res) => {
    const { passenger_id, first_name, last_name, date_of_birth, gender, nationality, passport_number, address, phone_number, email } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO passengers (passenger_id, first_name, last_name, date_of_birth, gender, nationality, passport_number, address, phone_number, email) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
            [passenger_id, first_name, last_name, date_of_birth, gender, nationality, passport_number, address, phone_number, email]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put("/:id", async (req, res) => {
    const { first_name, last_name, date_of_birth, gender, nationality, passport_number, address, phone_number, email } = req.body;
    try {
        const result = await pool.query(
            'UPDATE passengers SET first_name = $1, last_name = $2, date_of_birth = $3, gender = $4, nationality = $5, passport_number = $6, address = $7, phone_number = $8, email = $9 WHERE passenger_id = $10 RETURNING *',
            [first_name, last_name, date_of_birth, gender, nationality, passport_number, address, phone_number, email, req.params.id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Passenger not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const result = await pool.query('DELETE FROM passengers WHERE passenger_id = $1 RETURNING *', [req.params.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Passenger not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
*/
module.exports = router;



