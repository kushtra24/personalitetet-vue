<script lang="ts" setup>
import sidebar from '@/components/SidebarComponent.vue';
import { BlogPostStore } from '@/stores/BlogPostStore'
import { ref, onMounted, inject } from 'vue';
import useDateFormatter from '@/composables/FormatDate';
import type { BlogPostType } from '@/types/BlogPostType';
import useStringLimiter from '@/composables/LimitText';
import { useRouter, useRoute } from 'vue-router';
import type { CategoryType } from '@/types/CategoryType'
import { CategoryStore } from '@/stores/CategoryStore';
import CardComponent from '@/components/CardComponent.vue';

// Inject the subdomain from the global file
const injectedSubdomain = inject('subdomain', 'defaultSubdomain');

const { formatDate } = useDateFormatter();
const { limitString } = useStringLimiter();
const router = useRouter();
const route = useRoute();

const BlogPost = BlogPostStore();
const loading = ref<boolean>(true);
const articles = ref<Array<BlogPostType>>();
const currentPage = ref<number>(1);
const isLastPage = ref<boolean>(false);

const categoryStore = CategoryStore();
const categories = ref<Array<CategoryType>>();


onMounted(async () => {
  BlogPost.currentPage = Number(route.params.currentPage);
  getCategories();
  setArticleValue();
});

const navigatePosts = async (direction: String) => {

  if (direction == 'up') {
    currentPage.value++;
  } else {
    currentPage.value--;
  }

  if (currentPage.value === BlogPost.lastPage) {
    isLastPage.value = true;
  }
  
  BlogPost.currentPage = currentPage.value;
  setArticleValue();
  router.push("/blog/" + currentPage.value);
}

const setArticleValue = async () => {
  await BlogPost.getAllPosts();
  articles.value = BlogPost.posts
  loading.value = false;
}

const getCategories = async () => {
  await categoryStore.getAllCategories();
  categories.value = categoryStore.categories;
}

</script>

<template>
  <section id="index_of_blog">
    <div id="index-blog-title">
      <h1>Blog</h1>
    </div>
    <div class="container">
      <div class="col-md-8">
        <font-awesome-icon v-if="loading" :icon="['fas', 'spinner']" spin />
        <template v-if="!loading">
          <template v-for="post in articles" :key="post.id">

            <div class="featured-image">
              <template v-if="post.media.filename">
                <!-- <img :src="`public/${post.media.filename}.${post.media.extension}`" :alt="post.media.filename" width="100%" class="img-responsive"> -->
                <img :src="`${injectedSubdomain}/storage/${post.media.filename}.${post.media.extension}`"
                  :key="post.media.filename" :alt="post.media.filename" width="100%" class="img-responsive">
              </template>
              <template v-else>
                <img :src="'../public/images/blog-default.png'" alt="featured img" class="img-responsive">
              </template>

            </div>
            <div class="post-container">

              <a :href="'/article/' + post.id">
                <h3>{{ post.title }}</h3>
              </a>
              <div v-html="limitString(post.content, 300)">
              </div>
              <hr>
              <div>
                <!-- <b>Autori:</b> {{ post.data.user.first_name }} | -->
                <b>Data e Publikimit:</b> {{ formatDate(post.created_at) }} |
                <b>Kategori: </b>
                <div class="category-list-container">
                  <span class="cateogry-item" v-for="(category, index) in post.categories" :key="index">
                    {{ category.name }}
                  </span>
                </div>
              </div>
            </div>
          </template>
          <button @click="navigatePosts('Down')" v-if="currentPage > 1"
            class="btn btn-default footer-assesment-button">Kthehu</button>
          <button @click="navigatePosts('up')" v-if="!isLastPage"
            class="btn btn-default footer-assesment-button">vazhdo</button>
        </template>
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
</template>