<script setup>
import { ref, nextTick } from 'vue'

const props = defineProps({
  task: Object,
})

const emit = defineEmits(['delete', 'update', 'toggle-complete'])

const isEditing = ref(false)
const editedTaskName = ref(props.task.name)
const editInput = ref(null)

const startEdit = async () => {
  isEditing.value = true
  editedTaskName.value = props.task.name
  await nextTick() // Await DOM update
  editInput.value.focus() // Auto focus input
}

const saveEdit = () => {
  if (editedTaskName.value.trim()) {
    emit('update', { task: props.task, newName: editedTaskName.value.trim() })
    isEditing.value = false
  }
}

const cancelEdit = () => {
  isEditing.value = false
}
</script>

<template>
  <div class="task-item" :class="{ completed: task.completed }">
    <template v-if="isEditing">
      <input
        ref="editInput"
        type="text"
        v-model="editedTaskName"
        @keyup.enter="saveEdit"
        @keyup.esc="cancelEdit"
        @blur="cancelEdit"
        class="edit-input"
      />
      <button @click="saveEdit" class="save-btn">Lưu</button>
    </template>
    <template v-else>
      <input type="checkbox" :checked="task.completed" @change="emit('toggle-complete', task)" />
      <span class="task-name">{{ task.name }}</span>
      <div class="task-actions">
        <button @click="startEdit" class="edit-btn">✏️</button>
        <button @click="emit('delete', task)" class="delete-btn">🗑️</button>
      </div>
    </template>
  </div>
</template>

<style scoped>
.task-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  border-bottom: 1px solid var(--border-color);
  transition: border-color 0.3s ease;
}

.task-item.completed .task-name {
  text-decoration: line-through;
  color: var(--text-secondary);
}

.task-name {
  flex-grow: 1;
  word-break: break-word;
}

.task-actions {
  display: flex;
  gap: 5px;
}

.edit-input {
  flex-grow: 1;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid var(--accent-primary);
  background-color: var(--bg-primary);
  color: var(--text-primary);
}

button {
  padding: 5px 10px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  color: var(--button-text-color);
  transition: background-color 0.2s ease;
}

.edit-btn {
  background-color: var(--accent-edit);
}

.delete-btn {
  background-color: var(--accent-delete);
}

.save-btn {
  background-color: var(--accent-save);
}

input[type='checkbox'] {
  transform: scale(1.2);
  cursor: pointer;
}
</style>
