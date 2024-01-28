<script setup lang="ts">
import { BlogPostStore } from '@/stores/BlogPostStore';
import type { BlogPostType } from '@/types/BlogPostType';
import { ref, onMounted, inject } from 'vue';
import { useRoute } from 'vue-router';
import useDateFormatter from '@/composables/FormatDate';
import sidebar from '@/components/SidebarComponent.vue';
import { CategoryStore } from '@/stores/CategoryStore';
import type { CategoryType } from '@/types/CategoryType';

const BlogPost = BlogPostStore();
const Route = useRoute();
const post = ref<BlogPostType | null>(null);
const { formatDate } = useDateFormatter();
// Inject the subdomain from the global file
const injectedSubdomain = inject('subdomain', 'defaultSubdomain');

const categoryStore = CategoryStore();
const categories = ref<Array<CategoryType>>();

onMounted(() => {
  getCurrentArticle();
  getCategories();
})

const getCurrentArticle = async () => {
  await BlogPost.getArticleFromID(Number(Route.params.articleTitle));
  console.log('article -> ', BlogPost.article);
  post.value = BlogPost.article;
}

const getCategories = async () => {
  await categoryStore.getAllCategories();
  categories.value = categoryStore.categories;
}

</script>

<template>
  <div class="container articleView">
    <section id="post-{{ post.id }}" v-if="post">
      <div class="container">
        <div class="single-post-title">
          <h1>{{ post.title }}</h1>
          <p>
            Me: {{ formatDate(post.created_at) }}
            | <span class="cateogry-item" v-for="(category, index) in post.categories" :key="index">
              {{ category.name }}
            </span>
          </p>
        </div>
        <div class="col-md-8" id="post">
          <div class="featured-image">
              <template v-if="post.media.filename">
                <img :src="`${injectedSubdomain}/storage/${post.media.filename}.${post.media.extension}`"
                  :key="post.media.filename" :alt="post.media.filename" width="100%" class="img-responsive">
              </template>
              <template v-else>
                <img :src="'../public/images/blog-default.png'" alt="featured img" class="img-responsive">
              </template>
            </div>
            <div v-html="post.content"></div>
        </div>
        <sidebar>
          <CardComponent title="Kategoritë">
              <ul v-for="(category, index) in categories" :key="index">
                  <li>
                    <a href="" class="archives">{{
                      category.name }}</a>
                  </li>
              </ul>
          </CardComponent>
        </sidebar>
      </div>
    </section>
  </div>
</template>