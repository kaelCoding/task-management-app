import { ref, onMounted, watch, computed } from 'vue'

export function useTasks() {
  const tasks = ref([])
  const filterStatus = ref('all') // 'all', 'completed', 'incomplete'

  onMounted(() => {
    const savedTasks = localStorage.getItem('myTasks')
    if (savedTasks) {
      tasks.value = JSON.parse(savedTasks)
    }
  })

  watch(
    tasks,
    (newTasks) => {
      localStorage.setItem('myTasks', JSON.stringify(newTasks))
    },
    { deep: true },
  )

  // --- Logic CRUD ---
  const addTask = (taskName) => {
    if (taskName && taskName.trim() !== '') {
      tasks.value.unshift({
        id: Date.now(),
        completed: false,
        name: taskName.trim(),
      })
    }
  }

  const deleteTask = (taskToDelete) => {
    tasks.value = tasks.value.filter((task) => task.id !== taskToDelete.id)
  }

  const updateTask = ({ task: taskToUpdate, newName }) => {
    const task = tasks.value.find((t) => t.id === taskToUpdate.id)
    if (task && newName) {
      task.name = newName.trim()
    }
  }

  const toggleTaskCompletion = (taskToToggle) => {
    const task = tasks.value.find((t) => t.id === taskToToggle.id)
    if (task) {
      task.completed = !task.completed
    }
  }

  const filteredTasks = computed(() => {
    if (filterStatus.value === 'completed') {
      return tasks.value.filter((task) => task.completed)
    } else if (filterStatus.value === 'incomplete') {
      return tasks.value.filter((task) => !task.completed)
    }
    return tasks.value // 'all'
  })

  const setFilter = (status) => {
    filterStatus.value = status
  }

  return {
    tasks,
    filterStatus,
    filteredTasks,
    addTask,
    deleteTask,
    updateTask,
    toggleTaskCompletion,
    setFilter,
  }
}
