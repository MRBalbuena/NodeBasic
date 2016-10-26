// Pattern: Inheriting from EventEmitter
var util = require('util');
var EventEmitter = require('events').EventEmitter;

function Resource(m){

    var e = this;
    process.nextTick(function(){
        var count = 0;
        e.emit('start');
        var t = setInterval(function(){
            e.emit('data', ++count);
            if(count === m){
                e.emit('end', count);
                clearInterval(t);
            }
        }, 10);
    });
    return(e);
}

util.inherits(Resource, EventEmitter);

module.exports = Resource;