var express = require('express');
var bookRouter = express.Router();
//var sql = require('mssql');
var mongodb = require('mongodb').MongoClient;

var router = function (nav) {

    bookRouter.route('/')
        .get(function (req, res) {
            var url = 'mongodb://localhost:27017/libraryApp';
            mongodb.connect(url, function (err, db) {
                var collection = db.collection('books');
                collection.find({}).toArray(function (err, results) {
                    if(err) console.log(err);
                    res.render('bookListView', {
                        title: 'Books',
                        nav: nav,
                        books: results
                    });
                });

                // connect and get data from SQL Server
                // request.query('select * from books', function (err, recordset) {
                //     console.log(recordset); // to remove
                //     res.render('bookListView', {
                //         title: 'Books',
                //         nav: nav,
                //         books: recordset
                //     });
                // });
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