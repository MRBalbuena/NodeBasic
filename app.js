var express = require('express');

var app = express();
var port = process.env.PORT || 5000;
var bookRouter = express.Router();

app.use(express.static('public')); // first looks here
app.use(express.static('src/views')); // then here
app.set('views', './src/views');

app.set('view engine', 'ejs');

bookRouter.route('/')
    .get(function(req, res){
        res.render('books', {
        title: 'Hello from render', 
        nav: [{
            Link: '/Books',
            Text: 'Books'
        },{
            Link: '/Authors',
            Text: 'Authors'
        }]
    });
});

bookRouter.route('/single')
    .get(function(req, res){
        res.send('Hello Single Book');
    });

app.use('/Books', bookRouter);

app.get('/', function(req, res){
    res.render('index', {
        title: 'Hello from render', 
        nav: [{
            Link: '/Books',
            Text: 'Books'
        },{
            Link: '/Authors',
            Text: 'Authors'
        }]
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