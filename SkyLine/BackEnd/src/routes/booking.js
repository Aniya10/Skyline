const express = require('express');
const router = express.Router();
const pool = require('../db'); // Make sure to use the pool object correctly

// Get all bookings
router.get('/', async (req, res) => {
    try {
        const book = await pool.query('SELECT * FROM bookings');
        res.status(200).json(book.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a single booking by ID
router.get('/:id', async (req, res) => {
    try {
        const book1 = await pool.query('SELECT * FROM bookings WHERE booking_id = $1', [req.params.id]);
        res.json(book1.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create a new booking
router.post('/', async (req, res) => {
    const { booking_id, booking_datetime, seat_number, cabin_class, status, ticket_number, passenger_id, flight_id } = req.body;
    try {
        const book2 = await db.query(
            'INSERT INTO bookings (booking_id, booking_datetime, seat_number, cabin_class, status, ticket_number, passenger_id, flight_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
            [booking_id, booking_datetime, seat_number, cabin_class, status, ticket_number, passenger_id, flight_id]
        );
        res.status(201).json(book2.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a booking
router.put('/:id', async (req, res) => {
    const { booking_datetime, seat_number, cabin_class, status, ticket_number, passenger_id, flight_id } = req.body;
    const booking_id = req.params.id; // Extract booking ID from URL parameter
    
    try {
        // Execute the SQL query to update the booking record in the database
        const updatedBooking = await pool.query(
            'UPDATE bookings SET booking_datetime = $1, seat_number = $2, cabin_class = $3, status = $4, ticket_number = $5, passenger_id = $6, flight_id = $7 WHERE booking_id = $8 RETURNING *',
            [booking_datetime, seat_number, cabin_class, status, ticket_number, passenger_id, flight_id, booking_id]
        );

        // Check if the booking was successfully updated
        if (updatedBooking.rows.length > 0) {
            res.json(updatedBooking.rows[0]); // Return the updated booking record as JSON response
        } else {
            res.status(404).json({ error: 'Booking not found' }); // Handle case where booking ID does not exist
        }
    } catch (err) {
        console.error('Error updating booking:', err);
        res.status(500).json({ error: 'Failed to update booking' }); // Handle other errors with a generic message
    }
});

// Delete a booking
router.delete('/:id', async (req, res) => {
    try {
        await db.query('DELETE FROM bookings WHERE booking_id = $1', [req.params.id]);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
