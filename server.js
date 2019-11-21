const express = require("express");
const path = require("path");
const logger = require('morgan');
const PORT = process.env.PORT || 3001;
const budget = require('./routes/api/budget');
const auth = require('./routes/api/auth');
const SalaryByMajor = require('./routes/api/SalaryByMajorRoute')
const mongoose = require('mongoose');

const app = express();

mongoose.Promise = require('bluebird');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://user_allot:Secret123@ds037468.mlab.com:37468/heroku_482w6xfq', { promiseLibrary: require('bluebird') })
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Define API routes here
require('./routes/api/budget')(app);
require('./routes/api/auth')(app);
require('./routes/api/SalaryByMajorRoute')(app);


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
  //res.send({'message' : 'error' });
  res.redirect("/");
});

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.use(logger('dev'));

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
