<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

const gridContainer = ref<HTMLElement | null>(null)
const cells = computed(() => Array.from({ length: 100 }, (_, i) => ({ id: i })))

onMounted(() => {
  if (gridContainer.value) {
    gridContainer.value.style.display = 'grid'
    gridContainer.value.style.gridTemplateColumns = 'repeat(10, 50px)'
    gridContainer.value.style.gridTemplateRows = 'repeat(10, 50px)'
  }
})
</script>

<template>
  <div ref="gridContainer">
    <div v-for="cell in cells" :key="cell.id" class="grid-cell" />
  </div>
</template>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(10, 50px);
  grid-template-rows: repeat(10, 50px);
}

.grid-cell {
  border: 1px solid #ccc;
  background-color: #eee;
  height: 50px;
  width: 50px;
}
</style>
