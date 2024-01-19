import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { UserType } from '@/types/UserType'
import axiosClient from '@/axiosClient'

export const isAuthenticatedStore = defineStore('isAuthenticated', () => {
  const isAuthenticated = ref<boolean>(false) // state
  const authUser = ref<UserType>();

  function getAuthUser() {
    axiosClient.get('api/user')
    .then((res) => {
      authUser.value = res.data
    })
    .catch((err) => {
      console.log('Error getting Auth user from server', err);
    })
  }

  // const doubleCount = computed(() => count.value * 2) // action
  function authenticateUser(val: boolean) { // mutation
    isAuthenticated.value = val;
  }

  return { isAuthenticated, authenticateUser, getAuthUser}
})
