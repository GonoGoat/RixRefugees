require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var cors = require('cors');
const bodyParser = require('body-parser');

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

var app = express();

// view engine setup

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('../react-rixrefugees/build'));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/api/places_avail', placesAvailRouter)
app.use('/api/accomodations',accomodationsRouter)
app.use('/api/equipments',equipmentsRouter)
app.use('/api/places',placesRouter);
app.use('/api/sessions',sessionsRouter);
app.use('/api/users',usersRouter);
app.use('/api/tasks',tasksRouter);
app.use('/api/sessions_tasks',sessionsTasksRouter);
app.use('/api/availabilities',availabilitiesRouter);

app.use('*', reactRouter);

app.all("/*", function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT,POST,PATCH,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  next();
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

module.exports = app;
