const express = require('express');
const connectDB = require('./db');
const cors = require('cors');
const UserRoute = require('./routes/UserRoute');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDB();

app.get('/', (req, res) => {
    res.send('Hello, MERN!');
});

app.use(UserRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
