const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


let offerCandidates = [];
let answerCandidates = [];
let offerData = null;



io.on('connection', (socket) => {
  socket.on("add offer candidate", candidate => {
    offerCandidates.push(candidate);
    io.emit("add offer candidate", candidate);
  });


  socket.on("add answer candidate", candidate => {
    answerCandidates.push(candidate);
    io.emit("add answer candidate", candidate);
  });


  socket.on('offer', msg => {
    offerData = msg;
    console.log(offerData);
    io.emit('offer', msg);
  });

  socket.on("get offer", () => {
    io.emit("get offer", offerData);
  })



  socket.on("answer", (msg) => {
    io.emit("answer", msg);
  })

});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});