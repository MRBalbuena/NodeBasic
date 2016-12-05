var goodreadsService = function () {
    var getBookById = function (id, callback) {
        callback(null, { description: 'Our description' });
    };
    return {
        getBookById: getBookById
    };
}

module.exports = goodreadsService;