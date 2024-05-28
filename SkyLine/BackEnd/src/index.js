const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const session = require("express-session");
const pool = require("./db");

const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Add this middleware


app.use(session({
  secret: 'your_secret_key', // Replace with a secure key
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Use true in production with HTTPS
}));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to check authentication
const checkAuth = (req, res, next) => {
  if (req.session.user) {
      next();
  } else {
      res.status(401).send('<script>alert("Login first!"); window.location.href = "/login";</script>');
  }
};

// Serve the login page
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Login route
app.post("/authenticate", async (req, res) => {
  const { email, password } = req.body;
  console.log('Login attempt:', { email, password });

  try {
      const result = await pool.query('SELECT * FROM login WHERE email = $1 AND password = $2', [email, password]);
      if (result.rows.length > 0) {
          req.session.user = { email }; // Set user session
          console.log('Login successful:', { email });
          res.redirect('http://127.0.0.1:5500/BackEnd/src/home.html');
      } else {
          console.log('Login failed: Invalid email or password');
          res.send('<script>alert("Invalid email or password"); window.location.href = "/login";</script>');
      }
  } catch (err) {
      console.error('Error during authentication:', err);
      res.status(500).send('<script>alert("Internal server error. Please try again later."); window.location.href = "/login";</script>');
  }
});

// Protect home route
app.get('/home', checkAuth, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});


const passengerRoutes = require("./routes/passenger");
const flightsRouter = require("./routes/flights");
const bookingsRouter = require('./routes/booking');
const aircraftRouter = require('./routes/aircraft');
const airlineRouter = require('./routes/airline');
const airportRouter = require('./routes/airport');
const airportCrewRouter = require('./routes/aircrew');
const flightCrewRouter = require('./routes/flightcrew');
const baggageRouter = require('./routes/baggage');
const feedbackRouter = require('./routes/feedback');
const paymentRouter = require('./routes/payment');
const revenueRouter = require('./routes/revenue');



app.use("/passenger", passengerRoutes);
app.use("/flights", flightsRouter);
app.use("/booking", bookingsRouter);
app.use("/aircraft", aircraftRouter);
app.use("/airline", airlineRouter);
app.use("/airport", airportRouter);
app.use('/airportcrew', airportCrewRouter);
app.use('/flightcrew', flightCrewRouter);
app.use('/baggage', baggageRouter);
app.use('/feedback', feedbackRouter);
app.use('/payment', paymentRouter);
app.use('/revenue',revenueRouter);


app.listen(5900, () => {
    console.log("App listening on port 5900");
});
