import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { PersonalityType } from '@/types/PersonalityType';

export const personalityTypesStore = defineStore('personalityTypes', () => {
  const types = ref<Array<PersonalityType>>(); // state
  const typeSingle = ref<PersonalityType>();
  const typeSingleName = ref<string>();
  // const doubleCount = computed(() => count.value * 2)
  function fillSignleType(typeName: string) { // mutation
    const typeObejct = types.value?.find((element) => {
      return element.type == typeName;
    });
    typeSingle.value = typeObejct;
  }

  return { types, typeSingle, fillSignleType, typeSingleName }
})
