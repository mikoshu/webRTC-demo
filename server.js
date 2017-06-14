var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var path = require('path');

app.use(express.static(path.join(__dirname, 'www')));

io.on('connection', function(socket){
    //console.log('connected')
    io.emit('connected','connected');


    socket.on('__offer',function(data){
        io.emit('answer',data);
    }) 

});



server.listen(3000,function(){
    console.log('start on 3000')
});