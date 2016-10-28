// by default stdin starts as paused so must be resumed
process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function(chunk){
    process.stdout.write('Data! -> ' + chunk);
});

process.stdin.on('end', function(){
    process.stderr.write('End!\n');
});

// this should be thrown when taskkill /F /PID 7516 (7516 was in the sample de PID) from other console
// but in fact the process doesn't trigger
process.on('SIGTERM', function(){
    prompt.stderr.write("Why are you trying to terminate me?!?");    
});

console.log("Node is running as process #:" + process.pid);