const express = require('express');
const router = express.Router();
const pool = require('../db');


// READ
router.get('/', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM payments');
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  });

router.get('/:id', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM payments WHERE payment_id = $1', [req.params.id]);
        if (result.rows.length > 0) {
            res.json(result.rows[0]); // Send the fetched payment data as JSON response
        } else {
            res.status(404).json({ error: 'Payment not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error' });
    }
});

module.exports = router;


// CREATE
router.post('/', async (req, res) => {
  const { payment_id, amount, payment_datetime, payment_method, booking_id } = req.body;
  const query = 'INSERT INTO payments (payment_id, amount, payment_datetime, payment_method, booking_id) VALUES ($1, $2, $3, $4, $5)';
  const values = [payment_id, amount, payment_datetime, payment_method, booking_id];
  try {
    await pool.query(query, values);
    res.status(201).send('Payment added');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});



// UPDATE
router.put('/:id', async (req, res) => {
  const { amount, payment_datetime, payment_method, booking_id } = req.body;
  const { id } = req.params;
  const query = 'UPDATE payments SET amount=$1, payment_datetime=$2, payment_method=$3, booking_id=$4 WHERE payment_id=$5';
  const values = [amount, payment_datetime, payment_method, booking_id, id];
  try {
    await pool.query(query, values);
    res.send(`Payment with ID ${id} updated`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM payments WHERE payment_id=$1';
  try {
    await pool.query(query, [id]);
    res.send(`Payment with ID ${id} deleted`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
