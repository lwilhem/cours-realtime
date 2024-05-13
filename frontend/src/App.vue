<script setup lang="ts">
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");


socket.on("connect", () => {
  console.log("Connected to the server");
});

function createRoom(_e: MouseEvent) {
  socket.emit("create_room");
}

</script>

<template>
  <button @click="createRoom">Create room</button>
  <h1>Hello World !</h1>
</template>