import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { PersonalityType } from '@/types/PersonalityType';

export const personalityTypesStore = defineStore('personalityTypes', () => {
  const types = ref<Array<PersonalityType>>() // state
  // const doubleCount = computed(() => count.value * 2) // action
  // function authenticateUser(val: boolean) { // mutation
  //   isAuthenticated.value = val;
  // }

  return { types }
})
