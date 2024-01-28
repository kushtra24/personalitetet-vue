import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { UserType } from '@/types/UserType';
import axiosClient from '@/axiosClient';

export const UserStore = defineStore('UserStore', () => {
  const user = ref<Array<UserType>>(); // state

  // const doubleCount = computed(() => count.value * 2)

  const getUser = async () => { // mutation
    await axiosClient.get('api/blogPosts?user=')
      .then((res) => {
        user.value = res.data;
      })
      .catch((err) => {
        console.log('Faild getting user from db: ', err);
      })
  }

  return { user, getUser }
})
