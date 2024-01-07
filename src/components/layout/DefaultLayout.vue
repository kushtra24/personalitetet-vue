<script lang="ts" setup>
import FooterNavigation from '../FooterNavigation.vue';
import HeaderNavigation from '../HeaderNavigation.vue';


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
