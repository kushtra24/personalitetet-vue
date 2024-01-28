<script lang="ts" setup>
import FooterNavigation from '../FooterNavigation.vue';
import HeaderNavigation from '../HeaderNavigation.vue';
import { AuthStore } from '@/stores/AuthStore';

const initialize = () => {
  const getCookie:Array<string> = document.cookie.split('=');
  const xsrfToken = getCookie.filter(x => true)[0]
  const authStore = AuthStore();

  if(xsrfToken == 'XSRF-TOKEN') {
    authStore.authenticateUser(true);
  }
};

initialize();

</script>

<template>
  <header id="" class="clearfix " data-enllax-ratio=".5">
    <HeaderNavigation />
  </header>
  <main id="content">
    <div class="container mx-auto px-4">
      <router-view />
    </div>
  </main>
  <footer>
    <FooterNavigation />
  </footer>
</template>