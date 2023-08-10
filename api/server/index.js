const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const corsOptions = require('../config/corsOptions');
const { logger, logEvents } = require('../middleware/logger');
const errorHandler = require('../middleware/errorHandler');
const cookieParser = require('cookie-parser');
const connectDB = require('../config/dbConn');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const PageView = require('../models/Views');
//const userRoutes = require('../routes/userRoutes');


dotenv.config();

const PORT = process.env.PORT || 3500;

console.log(process.env.NODE_ENV);

connectDB();

app.use(logger);

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(cookieParser());

app.use('/', express.static(path.join(__dirname, '../public')));

app.use('/', require('../routes/root'));
app.use('/company', require('../routes/companyRoutes'));
app.use('/users', require('../routes/userRoutes'));
app.use('/subs', require('../routes/subscribersRoutes'));
app.use('/products', require('../routes/productsRoutes'));

const sessionOption = {
  secret: process.env.SECRET_KEY,
  cookie: {
      expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
      maxAge: 1000 * 60 * 60 * 24 * 7
  },
  resave: false,
  saveUninitialized: true
}

app.use(session(sessionOption));

app.get('/views', async (req, res, next) => {
  try {
    if (!req.session.pageViews) {
      req.session.pageViews = 1;
    } else {
      req.session.pageViews++;
    }

    const doc = await PageView.findOneAndUpdate(
      { sessionId: req.session.id },
      { $set: { pageViews: req.session.pageViews } },
      { upsert: true, new: true }
    );
    
    console.log('Updated page views in MongoDB:', doc);
    res.send(`You have viewed this site ${req.session.pageViews} times.`);
  } catch (err) {
    console.error('Error updating page views in MongoDB:', err);
    res.status(500).send('An error occurred while updating page views.');
  }
});


//Passport Configuration
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, '..', 'views', '404.html'))
  } else if (req.accepts('json')) {
    res.json({ message: `404 Not found` });
  } else {
    res.type('txt').send(`404 Not Found`);
  }
})

app.use(errorHandler);

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
});

mongoose.connection.on('error', err => {
  console.log(err);
  logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log');
});