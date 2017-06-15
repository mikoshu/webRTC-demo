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

    socket.emit('connected',{
    	id: socket.id
    });


    if(desc.length > 0){
        console.log('getdesc')
        socket.emit('getDesc',desc);
    }
    


    socket.on('__offer',function(data){
        desc.push(data);
        io.emit('join',data);
        //io.emit('answer',data);
    }) 

    socket.on('__answer',function(data){
        io.emit('join',data);
    }) 

    socket.on('disconnect',function(){
        console.log('123',socket.id)
        desc.map(function(val,i){
            if(val.data.id == socket.id){
                desc.splice(i,1);
            }
        })
    })

});





server.listen(3000,function(){
    console.log('start on 3000')
});