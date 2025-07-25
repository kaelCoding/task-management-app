<script setup>
import { computed } from 'vue'
import { useTasks } from '@/composables/useTasks.js'
import TaskForm from '@/components/TaskForm.vue'
import FilterControls from '@/components/FilterControls.vue'
import TaskList from '@/components/TaskList.vue'
import ThemeToggler from '@/components/ThemeToggler.vue'

const {
  filteredTasks,
  filterStatus,
  addTask,
  deleteTask,
  updateTask,
  toggleTaskCompletion,
  setFilter
} = useTasks()

const emptyMessage = computed(() => {
  switch (filterStatus.value) {
    case 'completed': return 'No work has been completed yet.'
    case 'incomplete': return 'There is no unfinished business.'
    default: return 'Get started by adding a new job!'
  }
})
</script>

<template>
  <div class="main-container">
    <div class="header-container">
      <h1>✔️ To-Do List</h1>
      <ThemeToggler />
    </div>

    <TaskForm @add-task="addTask" />
    <hr />

    <FilterControls :current-filter="filterStatus" @set-filter="setFilter" />

    <TaskList
      :tasks="filteredTasks"
      :message="emptyMessage"
      @delete="deleteTask"
      @update="updateTask"
      @toggle-complete="toggleTaskCompletion"
    />
  </div>
</template>

<style>
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px; 
}

.header-container h1 {
  margin-bottom: 0;
}
</style>