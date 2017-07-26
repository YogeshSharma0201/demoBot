// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
var axios = require('axios');
// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.use(bodyParser.json());

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/dreams", function (request, response) {
  response.send(dreams);
});

// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
app.post("/dreams", function (request, response) {
  dreams.push(request.query.dream);
  response.sendStatus(200);
});

// Simple in-memory store for now
var dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];

var updateId = 534193852;
app.post('/', function(req, res) {
    console.log(JSON.stringify(req.body, null, 2));
    if(req.body.update_id>updateId){
      var text;
      if(req.body.message.text==='ping'){
        text = 'pong';
      }
      else if(req.body.message.text==='ding'){
        text = 'dong';
      }
      else {
        text = 'error command not recognised';
      }
          axios.post('https://api.telegram.org/bot271141001:AAF9g09Q9hc_t3aBwAakj0dkcWqbyj8vYRQ/sendMessage', {
              chat_id: 426061629,
              text: text
            })
            .then(function (response) {
              console.log(response);
              res.status(200).send();
            })
            .catch(function (error) {
              console.log(error);
              res.status(200).send();
            });
      updateId = req.body.update_id;
    } else {
      res.status(200).send();
    }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
