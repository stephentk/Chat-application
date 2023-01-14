const  express = require('express')
const app = express()
const http = require('http')
const {Server} = require("socket.io")
const server = http.createServer(app)
const io =  new Server(server)
const port = 4000

app.use(express.static('mainpage'))
io.on('connection',(socket) => {
    console.log('a user is connected')
    socket.on('disconnect', () => {
        console.log('user disconnected');
      });
})
io.on('connection',(socket) => {
    socket.on('chat message',(msg) => {
        console.log('message:' + msg)
    })
})
io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });
  });

server.listen(port,()=> {
    console.log('listening on 4000')
})