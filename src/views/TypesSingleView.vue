<script lang="ts" setup>
import { ref, onMounted, onBeforeMount } from 'vue';
import SidbarComponent from '@/components/SidbarComponent.vue';
import { personalityTypesStore } from '@/stores/PersonalityTypesStore'
import type { PersonalityType } from '@/types/PersonalityType';
import axiosClient from '@/axiosClient';
import { useRoute } from 'vue-router';


const route = useRoute();
const personalityTypeStore = personalityTypesStore();
const personalityType = ref<PersonalityType>();
const loading = ref<boolean>(false);
onMounted(() => {
  // if types don't exist in store fetch them form the backend
  loading.value = true;
  if(personalityTypeStore.typeSingleName) {
    personalityTypeStore.fillSignleType(personalityTypeStore.typeSingleName);
    personalityType.value = personalityTypeStore.typeSingle;
    loading.value = false;
  } else {
    axiosClient.get(`api/type/${route.params.type}`)
    .then((response) => {
      personalityType.value = response.data;
      if(personalityType.value) {
        loading.value = false;
      }
    })
    .catch((err) => {
      console.log('Nope', err);
      loading.value = false;
    })
  }
});


onBeforeMount(() => {
  window.addEventListener('scroll', handleScroll)
})
const stickyHeader = ref(false)
function handleScroll(){
  if (window.scrollY) {
    stickyHeader.value = true
  } else {
    stickyHeader.value = false
  }
}
</script>

<template>
  <div class="container">

    <img :src="`public/${personalityType?.type_img}`" :alt="`tipi-${personalityType?.name}`" width="100%" class="img-responsive">

    <section id="type-single">
      <font-awesome-icon v-if="loading" :icon="['fas', 'spinner']" spin  />
      <div class="row" id="content" :class="{ 'displayflex': stickyHeader }" v-if="!loading">
        <div class="col-md-9">
          <h1>Tipi {{ personalityType?.type }}</h1>
          <h4>Nryshe njihet edhe si {{ personalityType?.name }}</h4>
          <hr>
          <div class="description">
            <div id="hyrja">
              <div v-html="$t(personalityType?.type + 'intro')"></div>
              <hr>
            </div>
            <div id="forcatDobesit">
              <div v-html="$t( personalityType?.type + 'weaknessAndForces')"></div>
              <hr>
            </div>
            <div id="lidhjet">
               <div v-html="$t(personalityType?.type + 'relationships') "></div>
              <hr>
            </div>
            <div id="miqesite">
               <div v-html="$t(personalityType?.type + 'friends') "></div>
              <hr>
            </div>
            <div id="siprinder">
               <div v-html="$t(personalityType?.type + 'parents') "></div>
              <hr>
            </div>
            <div id="profesioni">
               <div v-html="$t(personalityType?.type + 'profession') "></div>
              <hr>
            </div>
            <div id="vendipunes">
               <div v-html="$t(personalityType?.type + 'workPlace') "></div>
              <hr>
            </div>
            <div id="shtese">
               <div v-html="$t(personalityType?.type + 'shortDescription') "></div>
            </div>
          </div>
        </div>
        <SidbarComponent :type="personalityType?.type" />
      </div>

    </section>
  </div>
</template>

<style scoped>
.description {
  font-size: 18px;
  text-align: justify;
  line-height: 1.8;
}

.notLogedIn,
.social-share,
.placehodler {
  background-color: #fff;
  text-align: center;
  padding: 15px;
  margin: 15px 0;
}

.notLogedIn .btn,
.social-share .btn,
.placehodler .btn {
  width: 100%;
  margin: 10px 0;
}

.displayflex{
display: flex;
}
</style>