const express = require('express');
const router = express.Router();
const pool = require('../db');

// READ
router.get('/', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM feedback');
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  });

  router.get('/:id', async (req, res) => {
    try {
        const result1 = await pool.query('SELECT * FROM feedback WHERE feedback_id = $1', [req.params.id]);
        res.json(result1.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



// DELETE
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM feedback WHERE feedback_id=$1';
  try {
    await pool.query(query, [id]);
    res.send(`Feedback with ID ${id} deleted`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});



module.exports = router;
