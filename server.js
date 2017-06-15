var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var path = require('path');

app.use(express.static(path.join(__dirname, 'www')));
var connections = []; // 记录所有websocket链接
var desc = []; // 记录所有描述信息

io.on('connection', function(socket){
	var obj = {}
	obj.name = socket.id;
	obj.socket = socket;
	connections.push(obj);
    console.log(socket.id)
    socket.emit('connected',{
    	id: socket.id
    });



    


    socket.on('__offer',function(data){
        //desc.push(data);
        io.emit('join',data);
        //io.emit('answer',data);
    }) 

    socket.on('__answer',function(data){
        io.emit('join',data);
    }) 

});



server.listen(3000,function(){
    console.log('start on 3000')
});