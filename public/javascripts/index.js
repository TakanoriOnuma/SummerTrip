var socket = io.connect();
socket.on('connect', function() {
  console.log('connect:', socket.id);
});
socket.on('register', function(data) {
  $('#register').append(JSON.stringify(data) + '<br>');
});

$('form').submit(function(e) {
  e.preventDefault();

  var userId = $('#userId').val();
  $.post({
    url: '/v1/register',
    data: {
      userId: userId
    }
  });
});