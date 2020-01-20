const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const cors = require('cors');
const bcrypt = require('bcryptjs');
const app = express();


// cors secenekleri
const corsOptions = {
  exposedHeaders: ['Content-Length', 'Developer-By', 'X-Powered-By', "File-Name"],
};

mongoose.connect('mongodb://localhost/egitim', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('open', () => {
  console.log("bağlantı saglandı.");
});
mongoose.connection.on('error', (err) => {
  console.log(error);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


const indexRouter = require('./routes/index');
app.use('/', indexRouter);

const userRouter = require('./routes/user');
app.use('/user', userRouter);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
