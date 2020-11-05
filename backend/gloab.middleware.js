import express from 'express'
import logger from 'morgan';
import pdf from 'express-pdf';
import bodyParser from 'body-parser'

const app = express();
//used to log request in console for debugging
app.use(logger('dev'))
//to parse body of post request to json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//importing pdf library
app.use(pdf)

//cors
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With,Content-Type,Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS, PUT"
  )
  next()
})

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  return res.json({
    error: {
      message: error.message
    }
  })
})

module.exports = app;
