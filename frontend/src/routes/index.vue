<script setup lang="ts">
import { ref } from 'vue';

const room_name = ref("default_room_name")

</script>

<template>
  <input type="text" name="room_name" v-model="room_name" placeholder="edit me">

  <RouterLink :to="'/game/' + room_name">
    <span class="bg-red-500">Join {{ room_name }}</span>
  </RouterLink>

</template>