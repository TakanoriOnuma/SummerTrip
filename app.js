var express = require('express');
var bodyParser = require('body-parser');

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

// ルーティングの設定
app.use('/', require('./routes/index.js'));

var server = app.listen(3000, function() {
  console.log('Node.js is listening to PORT:' + server.address().port);
});