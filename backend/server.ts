import http from 'http'
import app from 'src/app'
import { Server } from 'socket.io'

const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*',
  }
})

io.on("connection", (socket) => {
  console.log("a user connected")
  socket.broadcast.emit('user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
    socket.broadcast.emit('user disconnected');
  });
  socket.on('message', (msg) => {
    console.log('message: ' + msg);
    io.emit('message', msg);
  });

  socket.on("create_room", () => {
    console.log("create_room")
  })
})

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
  console.log('Server ip : http://' + "127.0.0.1" +":" + PORT);
})
