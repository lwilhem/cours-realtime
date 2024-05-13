import http from 'http'
import app from 'src/app'
import { Server } from 'socket.io'
import { IGameStatusUpdate } from 'src/lib/types'

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

  socket.join("room_test")

  socket.on("game_action", (game_data: IGameStatusUpdate) => {
    io.to("room_test").emit("send_game_action", ({x, y}: {x: number, y: number}) => {
      console.log("game_data", game_data)
    })
  })

  socket.on("game_action_update", (response: "hit" | "miss" | "win") => {
    switch (response) {
      case "hit": {
        io.to("room_test").emit("send_game_action_update", "hit")
        break
      }
      case "miss": {
        io.to("room_test").emit("send_game_action_update", "miss")
        break
      }
      case "win": {
        io.to("room_test").emit("send_game_action_update", "win")
        break
      }
    }
  })

  socket.on("game_start", () => {
    io.to("room_test").emit("send_game_start")
  })
})

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
  console.log('Server ip : http://' + "127.0.0.1" +":" + PORT);
})
