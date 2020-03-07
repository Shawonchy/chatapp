const express = require('express');
const socket = require('socket.io');

var app=express();
app.use(express.static('public'));


var server=app.listen(4000,function () {
  console.log("listening to the port 3000");
})

var io=socket(server);

io.on('connection',function (socket) {
 console.log('a user has connected');
  socket.on('chat',function (data) {
    socket.join(data.room.toString());
      //io.emit('chat',data);
      io.to(data.room.toString()).emit('chat',data);
  })

  socket.on('type',function (data1) {
    console.log('typing');
    socket.join(data1.room.toString());
    socket.broadcast.to(data1.room.toString()).emit('type',data1.handle);
  })

})
