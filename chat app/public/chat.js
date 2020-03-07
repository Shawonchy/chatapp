//make connection
var socket=io.connect('http://localhost:4000');

var handle=document.getElementById('handle');
var output=document.getElementById('output');
var message=document.getElementById('message');
var room=document.getElementById('room');
var btn=document.getElementById('send');
var typing=document.getElementById('typing');


btn.addEventListener('click',function () {
   console.log('clicked.....');
  socket.emit('chat',
  {
    handle:handle.value,
    message:message.value,
    room:room.value
  })
  message.value = "";
})

message.addEventListener('keypress',function () {
  console.log('typing');
  socket.emit('type',
  {
  handle:handle.value,
  room:room.value
})
})


socket.on('chat',function (data) {
  typing.innerHTML='';
  output.innerHTML+='<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
})

socket.on('type',function (data1) {
  typing.innerHTML='<p><em>' + data1 + ' is typing a message...</em></p>';
})
