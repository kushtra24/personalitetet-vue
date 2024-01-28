import { ref } from 'vue';
import { defineStore } from 'pinia';
import axiosClient from '@/axiosClient';
import type { CategoryType } from '@/types/CategoryType';

export const CategoryStore = defineStore('CategoryStore', () => {
  const categories = ref<Array<CategoryType>>(); // state

  const getAllCategories = async () => {
      await axiosClient.get('api/categories')
        .then((res) => {
          categories.value = res.data;
        })
        .catch((err) => {
          console.log('Faild getting categories from db: ', err);
        })
  }

  return { categories, getAllCategories }
})
