var request = require('request');
var fs = require('fs');
var zlib = require('zlib');

request('http://www.pluralsight.com/').pipe(fs.createWriteStream('pipe_2_result_pluralsight.html'));
request('http://www.pluralsight.com/')
    .pipe(zlib.createGzip())
    .pipe(fs.createWriteStream('pipe_2_result_pluralsight.html.gz'));