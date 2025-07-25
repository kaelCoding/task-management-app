<script setup>
defineProps({
  currentFilter: String,
})
const emit = defineEmits(['set-filter'])
</script>

<template>
  <div class="filter-controls">
    <button :class="{ active: currentFilter === 'all' }" @click="emit('set-filter', 'all')">
      All
    </button>
    <button
      :class="{ active: currentFilter === 'completed' }"
      @click="emit('set-filter', 'completed')"
    >
      Completed
    </button>
    <button
      :class="{ active: currentFilter === 'incomplete' }"
      @click="emit('set-filter', 'incomplete')"
    >
      Unfinished
    </button>
  </div>
</template>

<style scoped>
.filter-controls {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  gap: 10px;
}

button {
  background-color: var(--bg-tertiary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

button.active {
  background-color: var(--accent-primary);
  color: var(--button-text-color);
  border-color: var(--accent-primary);
}

button:not(.active):hover {
  background-color: var(--border-color);
}
</style>
