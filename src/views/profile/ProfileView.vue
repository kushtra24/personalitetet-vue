<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { AuthStore } from '@/stores/AuthStore';
import type { UserType } from '@/types/UserType';
import useDateFormatter from '@/composables/FormatDate';

const userStore = AuthStore();
const user = ref<UserType | null>();
const { formatDate } = useDateFormatter();
const loading = ref<boolean>(true);

onMounted(() => {
  getUser();
});

const getUser = async () => {
  await userStore.getAuthUser();
  user.value = userStore.authUser;
  loading.value = false
}

</script>

<template>
  <div class="container user-profile">
    <font-awesome-icon v-if="loading" :icon="['fas', 'spinner']" spin />
    <div class="row" v-if="user">
      <div class="col-md-4">
        <img :src="`./public/images/${user.type}.png`" :alt="user.type" width="100%" class="img-responsive">
      </div>
      <div class="col-md-6 user-data">
        <h3>{{ user.first_name }} {{ user.last_name }}</h3>
        <p><b>Tipi: </b> <span>{{ user.type }}</span></p>
        <p><b>Gjinia: </b>
          <router-link v-if="!user.gjinia" :to="{ name: 'home' }" class="btn btn-default btn-xs pull-right">Shto
            gjini</router-link>
          <span v-else>{{ user.gjinia == "M" ? 'Mashkull' : 'Femer' }}</span>
        </p>
        <p><b>Data lindjes: </b>
          <router-link v-if="!user.age" :to="{ name: 'home' }" class="btn btn-default btn-xs pull-right">Shto
            Moshë</router-link>
          <span v-else>{{ formatDate(user.age) }}</span>
        </p>
        <p><b>Emaili: </b> {{ user.email }}</p>
        <p><b>Adresa: </b>
          <router-link v-if="!user.adresa" :to="{ name: 'home' }" class="btn btn-default btn-xs pull-right">Shto
            Adres</router-link>
          <span>{{ user.adresa }}</span>
        </p>

        <p>
          <b>Shteti:</b>
          <router-link v-if="!user.shteti" :to="{}" class="btn btn-default btn-xs pull-right">Shto
            shtet</router-link>
          <span>{{ user.shteti }}</span>
        </p>

        <p><b>Shkollimi: </b>
          <router-link v-if="!user.shkollimi" :to="{}" class="btn btn-default btn-xs pull-right">Shto
            shkollim</router-link>
          <span>{{ user.shkollimi }}</span>
        </p>

        <p><b>Vendëlindja: </b>
          <router-link v-if="!user.vendlindja" :to="{}" class="btn btn-default btn-xs pull-right">Shto
            vendlindje</router-link>
          <span>{{ user.vendlindja }}</span>
        </p>

        <p><b>Hobby: </b>
          <router-link v-if="!user.hobby" :to="{}" class="btn btn-default btn-xs pull-right">Shto
            hobby</router-link>
          <span>{{ user.hobby }}</span>
        </p>

        <p><b>Profili u Krijua me daten:</b> {{ formatDate(user.created_at) }}</p>

        <router-link :to="{name: 'profileEditView'}" class="btn btn-warning no-left-margin">Ndrysho
          Profilin</router-link>
      </div>
    </div>
  </div>
</template>