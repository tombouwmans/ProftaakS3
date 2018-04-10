var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Kinect2 = require('../node_modules/kinect2');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/indexkinect.html');
});

var kinect = new Kinect2();

if(kinect.open()) {
    http.listen(8000);
    console.log('Server listening on port 8000');

    kinect.on('bodyFrame', function(bodyFrame){
        io.sockets.emit('bodyFrame', bodyFrame);
    });

    kinect.openBodyReader();
}