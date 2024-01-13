import { ref } from 'vue'
import { defineStore } from 'pinia'

export const isAuthenticatedStore = defineStore('isAuthenticated', () => {
  const isAuthenticated = ref<boolean>(false) // state
  // const doubleCount = computed(() => count.value * 2) // action
  function authenticateUser(val: boolean) { // mutation
    isAuthenticated.value = val;
  }

  return { isAuthenticated, authenticateUser, }
})
