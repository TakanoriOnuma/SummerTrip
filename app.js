var express = require('express');
var bodyParser = require('body-parser');
// アプリケーション
var app = express();

// ビューエンジンの設定
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

// 静的ファイルのパスを指定
app.use('/public', express.static(__dirname + '/public'));

// クエリをJSONでパースする設定
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// サーバーの立ち上げとsocket.ioと関連付け
var server = app.listen(3000, function() {
  console.log('Node.js is listening to PORT:' + server.address().port);
});
var io = require('socket.io').listen(server);

// ルーティングの設定
app.use('/', require('./routes/index.js'));
// apiの設定
app.post('/v1/register', function(req, res) {
  io.sockets.emit('register', req.body);
  res.send(true);
});

// socket.ioのイベント処理
io.sockets.on('connection', function(socket) {
  console.log('connection:', socket.id);

  socket.on('disconnect', function() {
    console.log('disconnect:', socket.id);
  });
});

module.exports = app;