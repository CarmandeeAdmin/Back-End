var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
const mongoose = require('mongoose');

var config = require('./config');
var usersRouter = require('./routes/users');

const url = config.mongoUrl;
const connect = mongoose.connect(url,{useNewUrlParser: true,useUnifiedTopology: true});
connect.then((db) => {
    console.log("Database is successfully connected");
}, (err) => { console.log(err); });

var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is successfulyy running on port: ${port}`);
});

app.use(passport.initialize())

app.use('/users', usersRouter);


// app.use(express.static(path.join(__dirname, 'public')));


// app.use('/dishes',dishRouter);
// app.use('/promotions',promoRouter);
// app.use('/leaders',leaderRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
