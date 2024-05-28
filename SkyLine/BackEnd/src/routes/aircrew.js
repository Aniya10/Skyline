const express = require('express');
const router = express.Router();
const pool = require('../db');


// READ
router.get('/', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM airport_crew');
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  }); 

  router.get('/:id', async (req, res) => {
    try {
        const result1 = await pool.query('SELECT * FROM airport_crew WHERE airportcrew_id = $1', [req.params.id]);
        res.json(result1.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// CREATE
router.post('/', async (req, res) => {
  const { airportcrew_id, first_name, last_name, gender, position, address, contact_phone, contact_email, airport_id } = req.body;
  const query = 'INSERT INTO airport_crew (airportcrew_id, first_name, last_name, gender, position, address, contact_phone, contact_email, airport_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)';
  const values = [airportcrew_id, first_name, last_name, gender, position, address, contact_phone, contact_email, airport_id];
  try {
    await pool.query(query, values);
    res.status(201).send('Airport crew member added');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});



// UPDATE
router.put('/:id', async (req, res) => {
  const { first_name, last_name, gender, position, address, contact_phone, contact_email, airport_id } = req.body;
  const { id } = req.params;
  const query = 'UPDATE airport_crew SET first_name=$1, last_name=$2, gender=$3, position=$4, address=$5, contact_phone=$6, contact_email=$7, airport_id=$8 WHERE airportcrew_id=$9';
  const values = [first_name, last_name, gender, position, address, contact_phone, contact_email, airport_id, id];
  try {
    await pool.query(query, values);
    res.send(`Airport crew member with ID ${id} updated`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM airport_crew WHERE airportcrew_id=$1';
  try {
    await pool.query(query, [id]);
    res.send(`Airport crew member with ID ${id} deleted`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
