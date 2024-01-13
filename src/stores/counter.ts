import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0) // state
  const doubleCount = computed(() => count.value * 2) // action
  function increment() { // mutation
    count.value++
  }

  return { count, doubleCount, increment }
})