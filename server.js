const express = require('express'),
      rp = require('request-promise'),
      bodyParser = require('body-parser');

const app = express();

/******** EXPRESS MIDDLEWARE ********/
app.use(express.static(__dirname+'/public'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


/******** REQUEST HANDLERS ********/
const logreq = (req, res, next) => {
  console.log(`
    Request method: ${req.method},
    Request URL: ${req.url},
  `);
  next();
};

const shorten = (req, res, next) => {
  rp({
    method: 'GET',
    uri: 'https://is.gd/create.php',
    qs: {
      format: 'simple',
      url: req.query.url
    }
  }).then(result => {
    console.log(result);
    res.send(result);
  }).then(next);
}

/******** ROUTES ********/
app.get('/url', logreq, shorten);

/******** RUN SERVER ********/
const PORT = process.env.PORT;
app.listen(PORT, () => console.log("Listening on port ", PORT));
