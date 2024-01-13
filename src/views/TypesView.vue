<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import type { PersonalityType } from '../types/PersonalityType';
import axiosClient from '@/axiosClient';
import { personalityTypesStore } from '@/stores/personalityTypesStore'
const personalityTypes = personalityTypesStore();


const organizationTypes = ref<Array<PersonalityType>>();
const selfTypes = ref<Array<PersonalityType>>();
const friendsTypes = ref<Array<PersonalityType>>();
const meetingTypes = ref<Array<PersonalityType>>();



onMounted(() => {
  // if types don't exist in store fetch them form the backend
  if(!personalityTypes.types) {
    axiosClient.get('api/personalityTypes')
    .then((response) => {
      personalityTypes.types = response.data;
      if(personalityTypes.types?.length) {
        setTypes(personalityTypes.types);
      }
    })
    .catch((err) => {
      console.log('Nope', err);
    })
  } else if(personalityTypes.types?.length) {
    setTypes(personalityTypes.types);
    }
});
function splitArray(array: Array<PersonalityType>, chunkSize: number) {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
}

function setTypes(types: Array<PersonalityType>) {
  const sections = splitArray(types, 4); 
  organizationTypes.value = sections[0];
  selfTypes.value = sections[1];
  friendsTypes.value = sections[2];
  meetingTypes.value = sections[3];
}

</script>

<template>
  <div class="container">

    <section id="heading-welcomepage">
      <h1>{{ $t('personalityTpes') }}</h1>
      <h4>{{ $t('theseAreThePersonalityTypes') }}</h4>
      <hr>
    </section>

    <section id="the-types">

      <div id="organize" class="type-group row">
        <h1><strong>{{$t('organization')}}</strong></h1>
        <div class="col-md-3 the-type" v-for="personalityType in organizationTypes" :key="personalityType.id">
          <router-link :to="{ path: 'type/' + personalityType.type, }">
            <img :src="`public/${personalityType.type_img}`" :alt="`tipi-${personalityType.name}`">
            <h4>{{ personalityType.name }}</h4>
            <h5>{{ personalityType.type }}</h5>
          </router-link>
        </div>
      </div>

      <div id="vetvetja" class="type-group row">
        <h1><strong>{{$t('self')}}</strong></h1>
        <div class="col-md-3 the-type" v-for="personalityType in selfTypes" :key="personalityType.id">
          <router-link :to="{ path: 'type/' + personalityType.type, }">
            <img :src="`public/${personalityType.type_img}`" :alt="`tipi-${personalityType.name}`">
            <h4>{{ personalityType.name }}</h4>
            <h5>{{ personalityType.type }}</h5>
          </router-link>
        </div>
      </div>

      <div id="shoqeri" class="type-group row">
        <h1><strong>{{$t('friends')}}</strong></h1>
        <div class="col-md-3 the-type" v-for="personalityType in friendsTypes" :key="personalityType.id">
          <router-link :to="{ path: 'type/' + personalityType.type, }">
            <img :src="`public/${personalityType.type_img}`" :alt="`tipi-${personalityType.name}`">
            <h4>{{ personalityType.name }}</h4>
            <h5>{{ personalityType.type }}</h5>
          </router-link>
        </div>

      </div>

      <div id="mbledhje" class="type-group row">
        <h1><strong>{{$t('meeting')}}</strong></h1>
        <div class="col-md-3 the-type" v-for="personalityType in meetingTypes" :key="personalityType.id">
          <router-link :to="{ path: 'type/' + personalityType.type, }">
            <img :src="`public/${personalityType.type_img}`" :alt="`tipi-${personalityType.name}`">
            <h4>{{ personalityType.name }}</h4>
            <h5>{{ personalityType.type }}</h5>
          </router-link>
        </div>

      </div>
    </section>
  </div>
</template>