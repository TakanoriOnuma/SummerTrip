var socket = io.connect();
socket.on('register', function(data) {
  $('#register').append(JSON.stringify(data) + '<br>');
});