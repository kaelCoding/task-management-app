<script setup>
import TaskItem from './TaskItem.vue'

defineProps({
  tasks: Array,
  message: String,
})
const emit = defineEmits(['delete', 'update', 'toggle-complete'])
</script>

<template>
  <div class="task-list-container">
    <TransitionGroup name="task-list" tag="ul" class="task-list">
      <li v-for="task in tasks" :key="task.id">
        <TaskItem
          :task="task"
          @delete="emit('delete', $event)"
          @toggle-complete="emit('toggle-complete', $event)"
          @update="emit('update', $event)"
        />
      </li>
    </TransitionGroup>
    <p v-if="tasks.length === 0" class="empty-message">{{ message }}</p>
  </div>
</template>

<style scoped>
.task-list-container {
  margin-top: 20px;
}

.task-list {
  list-style: none;
  padding: 0;
  position: relative;
}

.empty-message {
  text-align: center;
  color: var(--text-secondary);
  padding: 20px;
}

.task-list-enter-active,
.task-list-leave-active {
  transition: all 0.5s ease;
}

.task-list-enter-from,
.task-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.task-list-move {
  transition: transform 0.5s ease;
}
</style>
