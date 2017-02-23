var express = require('express');
var path = require('path');
var logger = require('morgan');
var engine = require('ejs-mate');

var app = express();

// extend ejs to support layouts, partials, etc
app.engine('ejs', engine);

// view engine setup
app.set('views', path.join(__dirname, 'src'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'dist')));

// routes
var index = require('./routes/index');
var atoms = require('./routes/atoms');
app.use('/', index);
app.use('/atoms', atoms);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
	
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

