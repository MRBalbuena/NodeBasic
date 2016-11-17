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

            request.query('select * from books', function (err, recordset) {
                console.log(recordset); // to remove
                res.render('bookListView', {
                    title: 'Books',
                    nav: nav,
                    books: recordset
                });
            });
        });

    // this is replaced by :id to pass a single book id {*1}
    // bookRouter.route('/single')
    //     .get(function(req, res){
    //         res.send('Hello Single Book');
    //     });

    //{*1}
    bookRouter.route('/:id')
        .all(function (req, res, next) {
            var id = req.params.id;
            var ps = new sql.PreparedStatement();
            ps.input('id', sql.Int);
            ps.prepare('select * from books where id = @id',
                function (err) {
                    ps.execute({ id: req.params.id },
                        function (err, result) {
                            if (result.length === 0) {
                                res.status(404).send('Not Found');
                            } else {
                                req.book = result[0];
                                next();
                            }
                        }
                    )
                });

        })
        .get(function (req, res) {
            res.render('bookView', {
                title: 'Book',
                nav: nav,
                book: req.book
            });

        });

    return bookRouter;
};

module.exports = router;