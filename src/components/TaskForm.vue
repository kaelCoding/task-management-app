<script setup>
import { ref } from 'vue'

const emit = defineEmits(['add-task'])
const newTaskName = ref('')

const handleSubmit = () => {
  if (newTaskName.value.trim()) {
    emit('add-task', newTaskName.value)
    newTaskName.value = ''
  } else {
    alert('Please enter the job name!')
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="add-task-form">
    <input type="text" v-model="newTaskName" placeholder="Add new work ..." />
    <button type="submit">Add</button>
  </form>
</template>

<style scoped>
.add-task-form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

input[type='text'] {
  flex-grow: 1;
  padding: 10px;
  border: 1px solid var(--border-color);
  background-color: var(--bg-primary);
  color: var(--text-primary);
  border-radius: 4px;
  font-size: 16px;
  transition: all 0.3s ease;
}

button {
  padding: 10px 15px;
  background-color: var(--accent-add);
  color: var(--button-text-color);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.2s;
}

button:hover {
  background-color: var(--accent-add-hover);
}
</style>