const express = require('express');
const connectDB = require('./db');
const cors = require('cors');
const UserRoute = require('./routes/UserRoute');
const ClientRoute = require('./routes/ClientRoute');
const LoginRoute = require('./authRoutes/LoginRoutes')
const StoreRoute = require('./routes/addStoreRoute')
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDB();

app.get('/', (req, res) => {
    res.send('Hello, MERN!');
});

app.use(UserRoute);
app.use(ClientRoute);
app.use(LoginRoute);
app.use(StoreRoute);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
