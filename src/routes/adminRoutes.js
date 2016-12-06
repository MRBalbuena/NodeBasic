// route for MongoDB
var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var books = [];

var books = [{
    title: 'Dune',
    genre: 'Fiction',
    author: 'Frank Herlbert',
    bookId: 234225
}, {
    title: 'Foundation',
    genre: 'Fiction',
    author: 'Isaac Asimov',
    bookId: 29579
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

var router = function (nav) {
    adminRouter.route('/addBooks')
        .get(function (req, res) {
            var url = 'mongodb://localhost:27017/libraryApp';
            mongodb.connect(url, function (err, db) {
                var collection = db.collection('books');
                collection.insertMany(books, function (err, results) {
                    res.send(results);
                    db.close();
                });
            });
        });
    adminRouter.route('/all')
        .get(function (req, res) {
            var url = 'mongodb://localhost:27017/libraryApp';
            mongodb.connect(url, function (err, db) {
                var collection = db.collection('books');
                collection.find({}).toArray(function (err, results) {
                    if (err) { console.log(err); }
                    res.send(results);
                    db.close();
                });
            });
        });
    return adminRouter;
};

module.exports = router;