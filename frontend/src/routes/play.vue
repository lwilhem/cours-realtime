<script setup lang="ts">
import { io } from 'socket.io-client'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { usePlayerDataStore } from '../stores/player_data'
import Grid from '../components/Grid.vue'

const route = useRoute()
const player_data = usePlayerDataStore()
const room_name = route.params.room_name

const socket = io('http://127.0.0.1:3000')

socket.on('room_joined', (data) => {
  player_data.setPlayerId(data.playerId)
  player_data.setRoomName(data.room)

  console.log(player_data.player_id, player_data.room_name)
})

onMounted(() => {
  // emit a room event
  socket.emit('join_room', room_name)
})
</script>

<template>
  <h1>{{ room_name }}</h1>
  <main class="w-full h-screen flex items-center justify-center">
    <Grid />
  </main>
</template>
