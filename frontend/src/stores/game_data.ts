import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGameDataStore = defineStore('game_data', () => {
  const hasGameStarted = ref(false)

  function startGame() {
    hasGameStarted.value = true
  }

  return {
    hasGameStarted,
    startGame,
  }
})
