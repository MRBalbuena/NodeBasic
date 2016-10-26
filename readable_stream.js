var request = require('request');

var s = request('http://www.pluralsight.com');

s.on('data', function(data){
    console.log(">>> Data >>> " + data);
});

s.on('end', function(){
    console.log(">>> Done! >>>");
});