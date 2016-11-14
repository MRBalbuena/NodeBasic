var express = require('express');
var app = express();
var sql = require('mssql');

var connection = new sql.Connection({
    user: '...',
    password: '...',
    server: 'localhost',
    database: '...'
});

connection.connect(function(err){
    if(err){console.log(err)};
});

var port = process.env.PORT || 5000;
//var bookRouter = express.Router(); // now is in another file
var nav = [{
            Link: '/Books',
            Text: 'Books'
        },{
            Link: '/Authors',
            Text: 'Authors'
        }];
var bookRouter = require('./src/routes/bookRoutes')(nav);

app.use(express.static('public')); // first looks here
app.use(express.static('src/views')); // then here
app.set('views', './src/views');

app.set('view engine', 'ejs');

app.use('/Books', bookRouter);

app.get('/', function(req, res){
    res.render('index', {
        title: 'Hello from render', 
        nav: nav
    });
});



// if not applies routes.
// app.get('/', function(req, res){
//     res.send('index', {
//         title: 'Hello from render',
//         nav: [{
//             Link: '/Books',
//             Text: 'Books'
//         },{
//             Link: '/Authors',
//             Text: 'Authors'
//         }]
//     });
// });

app.listen(port, function(err){
    console.log('running server on port ' + port);
});