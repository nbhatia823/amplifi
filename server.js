const express = require('express'),
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
    Request URL: ${req.url}
  `);
  next();
};


/******** ROUTES ********/


/******** RUN SERVER ********/
app.listen(3000, () => console.log("Listening on port 3000."));
