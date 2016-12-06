var http = require('http');
var xml2js = require('xml2js');
var parser = xml2js.Parser({ explicitArray: false });

var goodreadsService = function () {
    console.log('in goodreadsService');
    var getBookById = function (id, cb) {
        console.log(id);
        var options = {
            host: 'www.goodreads.com',
            path: '/book/show/' + id + '?format=xml&key=HBD0ZmaBFFEmQPisXQA'
        };
        var callback = function (response) {
            var str = '';
            response.on('data', function (chunk) {
                str += chunk;
            });
            response.on('end', function () {
                console.log(str);
                parser.parseString(str, function (err, result) {
                    cb(null, result.GoodreadsResponse.book); // hierarchy extracted from xml structure displayed in host + path
                });
            });
        };
        http.request(options, callback).end();
    };
    return {
        getBookById: getBookById
    };
}

module.exports = goodreadsService;