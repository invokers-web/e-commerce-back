require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { default: mongoose } = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();

// REQUIRE ROUTES
const uploadRoutes = require('./routes/upload');

// BODY PARSERS
app.use(express.json());
app.use(bodyParser.json())

// COOKIES
app.use(cookieParser())

// Cors Middleware (Only for development)
const corsOptions = {
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions))

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))


// ROUTES
app.use("/uploads", uploadRoutes)

// ERROR CATCHER
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error!');
});


// DATABASE CONNECTION
mongoose.connect(process.env.MONGO_URI, {
    readPreference: 'secondaryPreferred',
    maxPoolSize: 10,
    minPoolSize: 5,
}).then(() => {
    console.log('Connected to Database')
}).catch((error) => {
    console.log(error)
})

// APP PORT LISTENER
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
})
