require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var cors = require('cors');

var reactRouter = require('./routes/react');
var placesRouter = require('./routes/places');
var equipmentsRouter = require('./routes/equipments');
var accomodationsRouter = require('./routes/accomodations');
var placesAvailRouter = require('./routes/places_availabilities');
var sessionsRouter = require('./routes/sessions');
var usersRouter = require ('./routes/users');
var tasksRouter = require ('./routes/tasks');
var sessionsTasksRouter = require('./routes/sessions_tasks');
var availabilitiesRouter = require('./routes/availabilities');
var friendsRouter = require('./routes/friends');
var assignmentsRouter = require('./routes/assignments');
var statusRouter = require('./routes/status');
var appointmentsRouter = require('./routes/appointments');

var app = express();

// view engine setup

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('../react-rixrefugees/build'));

app.use(cors({
  origin : [`${process.env.WEBSITE}:80`],
  methods : ["GET","POST","PUT","DELETE","OPTIONS","PATCH"],
  credentials : true
}));

app.use(session({
  key : "userId",
  secret : process.env.SESS_KEY, 
  resave : false,
  saveUninitialized : false,
  cookie : {
    maxAge : 1000 * 60 * 60 * 24
  }
}))

app.use('/api/places_avail', placesAvailRouter)
app.use('/api/accomodations',accomodationsRouter)
app.use('/api/equipments',equipmentsRouter)
app.use('/api/places',placesRouter);
app.use('/api/sessions',sessionsRouter);
app.use('/api/users',usersRouter);
app.use('/api/tasks',tasksRouter);
app.use('/api/sessions_tasks',sessionsTasksRouter);
app.use('/api/availabilities',availabilitiesRouter);
app.use('/api/friends',friendsRouter);
app.use('/api/assignments',assignmentsRouter);
app.use('/api/status',statusRouter);
app.use('/api/appointments',appointmentsRouter);

app.use('*', reactRouter);

module.exports = app;
