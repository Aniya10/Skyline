const express= require("express");
const router = express.Router();
 const pool=require("../db");

 // Get all flights
router.get("/", async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM flights');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a single flight by ID
router.get('/:id', async (req, res) => {
    try {
        const result1 = await pool.query('SELECT * FROM flights WHERE flight_id = $1', [req.params.id]);
        res.json(result1.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create a new flight
router.post('/', async (req, res) => {
    const { flight_id, source, destination, departure_time, arrival_time } = req.body;
    try {
        const result2 = await db.query(
            'INSERT INTO flights (flight_id, source, destination, departure_time, arrival_time) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [flight_id, source, destination, departure_time, arrival_time]
        );
        res.status(201).json(result2.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a flight
router.put('/:id', async (req, res) => {
    const { source, destination, departure_time, arrival_time } = req.body;
    try {
        const result33 = await db.query(
            'UPDATE flights SET source = $1, destination = $2, departure_time = $3, arrival_time = $4 WHERE flight_id = $5 RETURNING *',
            [source, destination, departure_time, arrival_time, req.params.id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a flight
router.delete('/:id', async (req, res) => {
    try {
      // Check if the flight is already cancelled
      const checkResult = await pool.query('SELECT flight_status FROM flights WHERE flight_id = $1', [req.params.id]);
  
      if (checkResult.rows.length === 0) {
        return res.status(404).json({ error: 'Flight not found' });
      }
  
      const flightStatus = checkResult.rows[0].flight_status;
  
      if (flightStatus === 'Cancelled') {
        return res.status(400).json({ error: 'Flight is already cancelled' });
      }
  
      // Insert into the cancelled_flights table
      await pool.query('INSERT INTO cancelled_flights (flight_id) VALUES ($1)', [req.params.id]);
      res.status(200).json({ message: 'Flight cancelled successfully' });
    } catch (err) {
      console.error('Error cancelling flight:', err.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = router;
