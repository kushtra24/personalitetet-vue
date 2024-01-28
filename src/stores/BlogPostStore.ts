import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { BlogPostType } from '@/types/BlogPostType';
import axiosClient from '@/axiosClient';

export const BlogPostStore = defineStore('BlogPost', () => {
  const posts = ref<Array<BlogPostType>>(); // state
  const currentPage = ref<number>(1);
  const lastPage = ref<number>();
  const article = ref<BlogPostType | null>(null);

  const getAllPosts = async () => {
    // if (!posts.value?.length && currentPage.value) {
      await axiosClient.get('api/blogPosts?page=' + currentPage.value)
        .then((res) => {
          posts.value = res.data.data;
          lastPage.value = res.data.last_page;
        })
        .catch((err) => {
          console.log('Faild getting posts from db: ', err);
        })
    // }
  }

  const getArticleFromID = async (id: number) => {
    if(posts.value) {
      article.value = posts.value.find((post) => post.id === id) || null;
    } else {
      await axiosClient.get('api/blog/' + id)
        .then((res) => {
          article.value = res.data;
          console.log('data -> ', res.data);
        })
        .catch((err) => {
          console.log('Faild getting an article from db: ', err);
        })
    }
  } 

  return { posts, currentPage, getAllPosts, lastPage, getArticleFromID, article }
})
