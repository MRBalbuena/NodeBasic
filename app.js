var express = require('express');

var app = express();
var port = process.env.PORT || 5000;
var bookRouter = express.Router();

app.use(express.static('public')); // first looks here
app.use(express.static('src/views')); // then here
app.set('views', './src/views');

app.set('view engine', 'ejs');

var books = [{
    title: 'C#',
    genre: 'Server side progarmming1',
    author: 'Marcelo'
},{
    title: 'Javascript#',
    genre: 'Client Programming',
    author: 'Marcelo'
},{
    title: 'SQL Server',
    genre: 'Databases Programming',
    author: 'Marcelo'
},{
    title: 'CSS',
    genre: 'Client Programming',
    author: 'Marcelo'
},{
    title: 'Angular2',
    genre: 'Client Programming',
    author: 'Marcelo'
}
];

bookRouter.route('/')
    .get(function(req, res){
        res.render('books', {
        title: 'Books', 
        nav: [{
            Link: '/Books',
            Text: 'Books'
        },{
            Link: '/Authors',
            Text: 'Authors'
        }],
        books: books
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