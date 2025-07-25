<script setup>
import { useTheme } from '@/composables/useTheme.js'

const { theme, toggleTheme } = useTheme()
</script>

<template>
  <button @click="toggleTheme" class="theme-toggler">
    <span v-if="theme === 'light'">🌙</span>
    <span v-else>☀️</span>
  </button>
</template>

<style scoped>
.theme-toggler {
  background: none;
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  transition: all 0.3s ease;
}

.theme-toggler:hover {
  background-color: var(--bg-secondary);
  transform: scale(1.1);
}
</style>