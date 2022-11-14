const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRouter');
const productsRoutes = require('./routes/productsRouter');
const keys = require('./config/keys');
const app = express();

mongoose.connect(keys.mongoURL)
    .then(() => console.log('MongoDb connected'))
    .catch((err) => console.log(err))

app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(require('cors')())

app.use('/api/auth', authRoutes);
app.use('/api/products', productsRoutes);

module.exports = app