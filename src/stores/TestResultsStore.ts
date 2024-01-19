import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { TestResultType } from '@/types/TestResultType';

export const TestResultsStore = defineStore('TestResultType', () => {
  const testResults = ref<Array<TestResultType>>(); // state
  // const doubleCount = computed(() => count.value * 2)
  // function fillSignleType(typeName: string) { // mutation
  //   const typeObejct = types.value?.find((element) => {
  //     return element.type == typeName;
  //   });
  //   typeSingle.value = typeObejct;
  // }

  return { testResults }
})
