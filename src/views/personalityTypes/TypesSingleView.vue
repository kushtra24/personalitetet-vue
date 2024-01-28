<script lang="ts" setup>
import { ref, onMounted, onBeforeMount } from 'vue';
import SidbarComponent from '@/components/SidebarComponent.vue';
import { personalityTypesStore } from '@/stores/PersonalityTypesStore'
import type { PersonalityType } from '@/types/PersonalityType';
import axiosClient from '@/axiosClient';
import { useRoute } from 'vue-router';
import { AuthStore } from '@/stores/AuthStore';
import useDateFormatter from '@/composables/FormatDate';
import CardComponent from '@/components/CardComponent.vue';

const authStore = AuthStore();
const authUserTestResults = ref();
const { formatDate } = useDateFormatter();
const route = useRoute();
const personalityTypeStore = personalityTypesStore();
const personalityType = ref<PersonalityType>();
const loading = ref<boolean>(false);
onMounted(() => {
  // if types don't exist in store fetch them form the backend
  loading.value = true;
  if (personalityTypeStore.typeSingleName) {
    personalityTypeStore.fillSignleType(personalityTypeStore.typeSingleName);
    personalityType.value = personalityTypeStore.typeSingle;
    loading.value = false;
  } else {
    axiosClient.get(`api/type/${route.params.type}`)
      .then((response) => {
        personalityType.value = response.data;
        if (personalityType.value) {
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

  // test results of authenticated user
  axiosClient.get('api/home')
    .then((res) => {
      authUserTestResults.value = res.data;
    })
    .catch((err) => {
      console.log('error getting user results', err);
    })

  window.addEventListener('scroll', handleScroll)
});

const stickyHeader = ref(false)
const handleScroll = () => {
  if (window.scrollY) {
    stickyHeader.value = true
  } else {
    stickyHeader.value = false
  }
}
</script>

<template>
  <div class="container typesSingleView">

    <img :src="`/public/${personalityType?.type}-feat.png`" :alt="`tipi-${personalityType?.name}`" width="100%"
      class="img-responsive">

    <section id="type-single">
      <font-awesome-icon v-if="loading" :icon="['fas', 'spinner']" spin />
      <div class="row" id="content" :class="{ 'displayflex': stickyHeader }" v-if="!loading">
        <div class="col-md-8">
          <h1>Tipi {{ personalityType?.type }}</h1>
          <h4>Nryshe njihet edhe si {{ personalityType?.name }}</h4>
          <hr>
          <div class="description">
            <div id="hyrja">
              <div v-html="$t(personalityType?.type + 'intro')"></div>
              <hr>
            </div>
            <div id="forcatDobesit">
              <div v-html="$t(personalityType?.type + 'weaknessAndForces')"></div>
              <hr>
            </div>
            <div id="lidhjet">
              <div v-html="$t(personalityType?.type + 'relationships')"></div>
              <hr>
            </div>
            <div id="miqesite">
              <div v-html="$t(personalityType?.type + 'friends')"></div>
              <hr>
            </div>
            <div id="siprinder">
              <div v-html="$t(personalityType?.type + 'parents')"></div>
              <hr>
            </div>
            <div id="profesioni">
              <div v-html="$t(personalityType?.type + 'profession')"></div>
              <hr>
            </div>
            <div id="vendipunes">
              <div v-html="$t(personalityType?.type + 'workPlace')"></div>
              <hr>
            </div>
            <div id="shtese">
              <div v-html="$t(personalityType?.type + 'shortDescription')"></div>
            </div>
          </div>
        </div>
        <SidbarComponent style="margin-top: 100px;">
          <template v-if="authStore.isAuthenticated && authUserTestResults">
            <CardComponent title="Resultatet e juaja">
              <div class="placehodler">
                <table width="100%">
                  <th>{{ authUserTestResults?.finaltype }}</th>
                  <tr>
                    <td>{{ authUserTestResults?.intro_extro }}</td>
                    <td>{{ authUserTestResults?.first_final_procent_rez }}% </td>
                  </tr>
                  <tr>
                    <td>{{ authUserTestResults?.intu_sens }}</td>
                    <td>{{ authUserTestResults?.ns_final_procent_rez }}% </td>
                  </tr>
                  <tr>
                    <td>{{ authUserTestResults?.feeling_thinking }}</td>
                    <td>{{ authUserTestResults?.ft_final_procent_rez }}% </td>
                  </tr>
                  <tr>
                    <td>{{ authUserTestResults?.judging_perspecting }}</td>
                    <td>{{ authUserTestResults?.jp_final_procent_rez }}% </td>
                  </tr>
                </table>
                <br>
                <hr>
                <p>from: {{ formatDate(authUserTestResults?.created_at) }}</p>
              </div>
            </CardComponent>
          </template>
          <template v-else>
            <CardComponent title="Sapo Erdhe?">
              <div class="notLogedIn">
                <router-link :to="{ name: 'testPage' }" class="btn btn-default">Fillo Vlersimin</router-link>
                <p v-if="!authUserTestResults">Nëse ke llogari <router-link :to="{ name: 'login' }"> Kyqu</router-link>
                </p>
              </div>
            </CardComponent>
          </template>
          <CardComponent :title="`Eksploroje ${personalityType?.type}n`" :isSticky="true">
            <div id="stickySidebar">
              <ul>
                <li> <a href="#hyrja">Hyrje</a></li>
                <li> <a href="#forcatDobesit">Forcat/Dobesit</a></li>
                <li> <a href="#lidhjet">Lidhjet</a></li>
                <li> <a href="#miqesite">Miqesite</a></li>
                <li> <a href="#siprinder">Si prinder</a></li>
                <li> <a href="#profesioni">Profesioni</a></li>
                <li> <a href="#vendipunes">Vendi Punës</a></li>
                <li> <a href="#shtese">Më shumë</a></li>
              </ul>
            </div>
          </CardComponent>

        </SidbarComponent>
      </div>

    </section>
  </div>
</template>

<style scoped>
#stickySidebar {
  padding: 15px 0;
  position: sticky;
  top: 20px;
}

#stickySidebar li {
  list-style: none;
  margin: 5px 0;
  text-transform: uppercase;
}

#stickySidebar h4 {
  text-align: center;
  font-weight: 700;
}

.description {
  font-size: 18px;
  text-align: justify;
  line-height: 1.8;
}

.notLogedIn,
.social-share,
.placehodler {
  padding: 15px;
  margin: 15px 0;
}

.notLogedIn .btn,
.social-share .btn,
.placehodler .btn {
  width: 100%;
  margin: 10px 0;
}

.displayflex {
  display: flex;
}
</style>