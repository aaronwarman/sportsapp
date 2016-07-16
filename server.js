var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({expanded:true}));

var list = [
  { name: 'New York Mets', code: 'nym'},
  { name: 'New York Yankees', code: 'nyy'},
  { name: 'Kansas City Royals', code: 'kc'}
];

var saveTeam = function (name, code) {
 list.push({name: name, code: code});
};

// refactor to make more consice 
var removeTeam = function (code) {
  for (i = 0; i < list.length; i++) {
    if (list[i].code === code) {
      list.splice(i,1);
    };
  };
};

app.get('/', function(req, res) {
  res.send('hello world');
});

app.get('/list', function(req, res) {
  res.render('list', {list: list});
});

app.post('/list/add', function(req, res) {
  saveTeam(req.param('name'),req.param('code'));
  res.redirect('/list');
});

//refactor to use post request
app.get('/list/remove/:code', function(req, res) {
  removeTeam(req.params.code);
  res.redirect('/list');
});

app.listen(3000, function() {
  console.log('listening on port 3000');
});




