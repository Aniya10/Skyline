const express = require('express');
const app = express();
const topDestinationsRoute = require('./routes/destination'); 
const feedviewRoute = require('./routes/feedview'); 

app.use(express.json());
app.use("/destination", topDestinationsRoute);
app.use("/feedview", feedviewRoute);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

