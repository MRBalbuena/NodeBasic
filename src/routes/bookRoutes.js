var express = require('express');
var bookRouter = express.Router();
var sql = require('mssql');



var router = function (nav) {

    var books = [{
        title: 'C#',
        genre: 'Server side progarmming1',
        author: 'Marcelo'
    }, {
        title: 'Javascript#',
        genre: 'Client Programming',
        author: 'Marcelo'
    }, {
        title: 'SQL Server',
        genre: 'Databases Programming',
        author: 'Marcelo'
    }, {
        title: 'CSS',
        genre: 'Client Programming',
        author: 'Marcelo'
    }, {
        title: 'Angular2',
        genre: 'Client Programming',
        author: 'Marcelo'
    }
    ];

    bookRouter.route('/')
        .get(function (req, res) {
            var request = new sql.Request();

            request.query('select * from books'), function (err, recordset) {
                console.log(recordset); // to remove
                res.render('bookListView', {
                    title: 'Books',
                    nav: nav,
                    books: recordest
                });
            }
        });

    // this is replaced by :id to pass a single book id {*1}
    // bookRouter.route('/single')
    //     .get(function(req, res){
    //         res.send('Hello Single Book');
    //     });

    //{*1}
    bookRouter.route('/:id')
        .get(function (req, res) {
            var id = req.params.id;
            res.render('bookView', {
                title: 'Books',
                nav: nav,
                book: books[id]
            });
        });
    return bookRouter
};

module.exports = router;