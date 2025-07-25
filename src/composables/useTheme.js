import { ref, watch, onMounted } from 'vue'

export function useTheme() {
  const theme = ref(localStorage.getItem('theme') || 'light')

  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }

  watch(theme, (newTheme) => {
    document.documentElement.className = newTheme
    localStorage.setItem('theme', newTheme)
  })

  onMounted(() => {
    document.documentElement.className = theme.value
  })

  return {
    theme,
    toggleTheme,
  }
}