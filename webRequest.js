var http = require('http');

var options = {
    host: 'www.pluralsight.com', 
    port: 80, 
    path: '/', 
    method: 'GET'
}

console.log('going to make request...');
/*
this currently doesn't work
var req = http.request(options, function(response){
        console.log(response.statusCode);
        response.pipe(process.stdout);
});

req.end();
*/

// get doesn't require to end
http.get(options, function(response){
        console.log(response.statusCode);
        response.pipe(process.stdout);
});
