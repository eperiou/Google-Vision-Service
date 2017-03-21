const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

require('dotenv').config();
const GOOGLE_VISION = process.env.GOOGLE_VISION;
const GOOGLE_APPLICATION_CREDENTIALS = process.env.GOOGLE_APPLICATION_CREDENTIALS;


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;
const rp = require('request-promise');


app.post('/picture/labels', (req, res) => {
  const options = {
    method: 'POST',
    uri: `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_VISION}`,
    body: {
        requests: req.body.requests,
    },
    json: true // Automatically stringifies the body to JSON
  };

  rp(options)
    .then(function (parsedBody) {
      // POST succeeded...
      // response comes back in the form of responses[0].****Annotations, which is
      // an array of objects with description and score
      //  console.log(parsedBody.responses);
      // console.log(parsedBody.responses[0].logoAnnotations);
      // console.log(parsedBody.responses[0].labelAnnotations);
      res.send(parsedBody.responses);
    })
    .catch(function (err) {
      // POST failed...
      throw new Error(err);
    });
});
app.get('/test', (req,res)=>{
  res.send('you hit that good server!')
})

app.listen(PORT, function() {
  console.log('HEY LISTEN', PORT);
});
