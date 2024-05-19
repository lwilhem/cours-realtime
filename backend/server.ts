import http from 'http'
import app from 'src/app'
import { Server } from 'socket.io'

interface RoomData {
  room: string;
  playerId: number;
}

const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*',
  }
})

const roomStates = new Map<string, { player1Ready: boolean, player2Ready: boolean }>();

io.on("connection", (socket) => {
  socket.on('disconnect', () => {
    console.log('user disconnected:' + socket.id);
  });

  console.log("a user connected:" + socket.id)
  
  // Room Setup
  socket.on("join_room", (room: string) => {

    const roomClients = io.sockets.adapter.rooms.get(room) || new Set();
    const numClients = roomClients.size;

    switch(numClients){
      case 0:
        socket.join(room)
        socket.emit('room_joined', { room, playerId: 1 });
        console.log("a user with id: " + socket.id + " joined room:" + room)
        break;
      case 1:
        socket.join(room)
        socket.emit('room_joined', { room, playerId: 2 });
        console.log("a user with id: " + socket.id + " joined room:" + room)
        break;
      default:
        socket.emit('roomFull', `Room ${room} is full. Try another room.`);
        console.log(`Room ${room} is full`);
    }
  })

  // GameStart
  socket.on("player_ready", ({room, playerId}: RoomData) => {
    const roomState = roomStates.get(room) || { player1Ready: false, player2Ready: false };

        if (playerId === 1) {
          roomState.player1Ready = true;
        } else if (playerId === 2) {
          roomState.player2Ready = true;
        }

        roomStates.set(room, roomState);

    if (roomState.player1Ready && roomState.player2Ready) {
      io.to(room).emit("game_start");
    } else {
      socket.broadcast.to(room).emit('opponent_ready');
    }  
  
  })

  socket.on('attack', ({ room, playerId, position }: { room: string, playerId: number, position: {x: number, y: number} }) => {
    console.log("playerId: " + playerId + "attac-k")

    socket.broadcast.to(room).emit('check_attack', {
      position
    })
  })

  socket.on('attack_check', ({room, playerId, hit}: {room: string, playerId: number, hit: boolean}) => {
    console.log("playerId: " + playerId + "attack_result")

    io.to(room).emit("attack_result", { hit })
  })

  
  // Impléménter la fin de parties
})

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
  console.log('Server ip : http://' + "127.0.0.1" +":" + PORT);
})
