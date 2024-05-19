<script setup lang="ts">
import { onMounted, ref } from 'vue'

const gridContainer = ref<HTMLElement | null>(null)

onMounted(() => {
  if (gridContainer.value) {
    gridContainer.value.style.display = 'grid'
    gridContainer.value.style.gridTemplateColumns = 'repeat(10, 50px)'
    gridContainer.value.style.gridTemplateRows = 'repeat(10, 50px)'
  }
})
</script>

<template>
  <div ref="gridContainer" />
</template>
