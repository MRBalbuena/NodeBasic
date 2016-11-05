var express = require('express');

var app = express();
var port = 5000;

app.use(express.static('public')); // first looks here
app.use(express.static('src/views')); // then here

// if not applies routes.
app.get('/', function(req, res){
    res.send('Hello World');
});

app.get('/books', function(req, res){
    res.send('Hello books');
});

app.listen(port, function(err){
    console.log('running server on port ' + port);
})