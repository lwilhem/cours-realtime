import { defineStore } from "pinia";
import { ref } from "vue";

export const usePlayerDataStore = defineStore("player_data", () => {
  const room_name = ref("")
  const player_id = ref(0)

  function setRoomName(room: string) {
    room_name.value = room
  }

  function setPlayerId(id: number) {
    player_id.value = id
  }

  return {
    room_name,
    player_id,
    setPlayerId,
    setRoomName
  }
})