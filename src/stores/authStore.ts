import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { UserType } from '@/types/UserType'
import axiosClient from '@/axiosClient'

export const AuthStore = defineStore('isAuthenticated', () => {
  const isAuthenticated = ref<boolean>(false) // state
  const authUser = ref<UserType | null>();

  const getAuthUser = async () => {
    await axiosClient.get('api/profile')
      .then((res) => {
        authUser.value = res.data
        authenticateUser(true);
      })
      .catch((err) => {
        if(err.response.data.message === 'Unauthenticated.') {
          authenticateUser(false);
        }
        console.log('Error getting Auth user from server', err);
      })
  }

  const logoutUser = () => {
    axiosClient.post('api/logout')
      .then(() => {
        authenticateUser(false);
      })
      .catch((err) => {
        if(err.response.data.message === 'Unauthenticated.') {
          authenticateUser(false);
        }
        console.log('Error getting Auth user from server', err);
      })
  }

  // const doubleCount = computed(() => count.value * 2) // action
  function authenticateUser(val: boolean) { // mutation
    if(val === false) {
      document.cookie = "XSRF-TOKEN=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      authUser.value = null;
    }
    isAuthenticated.value = val;
  }

  return { isAuthenticated, authenticateUser, getAuthUser, logoutUser, authUser}
})
