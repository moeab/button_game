var express = require('express');
var path = require('path');
var app = express()

app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine' , 'ejs');

app.get('/', function(req, res){
	res.render('index');
})

var server = app.listen(9789, function(){
	console.log('Listening on port 9789');
})

var io = require('socket.io').listen(server);
var counter = 0;
io.sockets.on('connection', function(socket){
	io.emit('counter', {count : counter});
	socket.on('btn_click', function(){
		counter++; 
		io.emit('counter', {count : counter});
	})
	socket.on('reset', function(){
		counter = 0;
		io.emit('counter', {count : counter});
	})
})