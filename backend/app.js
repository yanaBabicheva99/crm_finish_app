const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRouter');
const productsRoutes = require('./routes/productsRouter');
const keys = require('./config/keys');
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true,
  })
)
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize())

require('./middleware/passport')(passport)

app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/products', productsRoutes);

mongoose.connect(keys.mongoURL)
  .then(() => console.log('MongoDb connected'))
  .catch((err) => console.log(err))

module.exports = app