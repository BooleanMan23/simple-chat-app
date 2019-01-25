var express = require("express");
var app = express();
var socket = require("socket.io");


var server = app.listen(3000, function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log("listening to request on port 3000");
    }

})

//static files 
app.use(express.static("public"));
app.set("view engine", "ejs");

//socket setup
var io = socket(server);
io.on('connection', (socket) => {

    console.log('made socket connection', socket.id);
     // Handle chat event
     socket.on('chat', function(data){
        // console.log(data);
        io.sockets.emit('chat', data);
    });

    // Handle typing event
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });

});