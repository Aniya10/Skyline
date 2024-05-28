const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM baggage');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM baggage WHERE passenger_id = $1', [req.params.id]);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;


/*// CREATE
router.post('/', async (req, res) => {
  const { baggage_id, weight, fees, passenger_id, flight_id } = req.body;
  const query = 'INSERT INTO baggage (baggage_id, weight, fees, passenger_id, flight_id) VALUES ($1, $2, $3, $4, $5)';
  const values = [baggage_id, weight, fees, passenger_id, flight_id];
  try {
    await pool.query(query, values);
    res.status(201).send('Baggage added');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});



// UPDATE
router.put('/:id', async (req, res) => {
  const { weight, fees, passenger_id, flight_id } = req.body;
  const { id } = req.params;
  const query = 'UPDATE baggage SET weight=$1, fees=$2, passenger_id=$3, flight_id=$4 WHERE baggage_id=$5';
  const values = [weight, fees, passenger_id, flight_id, id];
  try {
    await pool.query(query, values);
    res.send(`Baggage with ID ${id} updated`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM baggage WHERE baggage_id=$1';
  try {
    await pool.query(query, [id]);
    res.send(`Baggage with ID ${id} deleted`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
*/