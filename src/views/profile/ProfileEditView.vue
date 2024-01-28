<script lang="ts" setup>
import useDateFormatter from '@/composables/FormatDate';
import { AuthStore } from '@/stores/AuthStore';
import type { UserType } from '@/types/UserType';
import { ref, onMounted } from 'vue';
import { CountryStore } from '@/stores/CountryStore';
import axiosClient from '@/axiosClient';
import MessageComponent from '@/components/MessageComponent.vue';

const userStore = AuthStore();
const countries = CountryStore()
const { formatDate } = useDateFormatter();
const user = ref<UserType | null>();
const loading = ref<boolean>(true);
const updateMessage = ref<string | null>();
const updateSevirity = ref<string>('Your message goes here');

onMounted(() => {
  getUser();
});

const getUser = async () => {
  await userStore.getAuthUser();
  user.value = userStore.authUser;
  loading.value = false;
}

const udapteProfile = () => {
  axiosClient.put('api/profili/'+ user.value?.id +'/update', user.value)
    .then(() => {
      updateMessage.value = "Updated";
      updateSevirity.value = "success";
      
      console.log('User updated');
    })
    .catch((err) => {
      updateMessage.value = "Error Could not update user";
      updateSevirity.value = "error";
      console.log(err);
    })
}


</script>

<template>
  <div class="container edit-user-profile">
    <div class="row">
      <font-awesome-icon v-if="loading" :icon="['fas', 'spinner']" spin />

      <div v-if="user" class="col-md-8 col-md-offset-2 user-data">
        
        <MessageComponent v-if="updateMessage" :sevirity="updateSevirity" >{{ updateMessage }}</MessageComponent>
        
        <form @submit.prevent="udapteProfile">
          <h3>
            {{ user.first_name }} {{ user.last_name }}
          </h3>
          <p><b>Tipi: </b><span>{{ user.type }}</span></p>
          <p><b>Emaili:</b> {{ user.email }}</p>

          <p><b>Profili u Krijua me:</b> {{ formatDate(user.created_at) }}</p>

          <p><b>Data Lindjes: </b> {{ formatDate(user.created_at) }}</p>

          <div class="col-md-2">
            <h4><b>Gjinia:</b></h4>
          </div>
          <div class="col-md-10">
            <div class="form-group">
              <select v-model="user.gjinia" class="form-select form-control">
                <option value="1">Mashkull</option>
                <option value="0">Femër</option>
              </select>
            </div>
          </div>

          <div class="col-md-2">
            <h4><b>Adresa:</b></h4>
          </div>
          <div class="col-md-10">
            <div class="form-group">
              <input type="text" class="form-control" name="adresa" placeholder="Adresa" v-model="user.adresa">
            </div>
          </div>

          <div class="col-md-2">
            <h4><b>Shteti:</b></h4>
          </div>
          <div class="col-md-10">
            <div class="form-group">
              <select v-model="user.shteti" class="form-select form-control">
                <option v-for="(item, index) in countries.countryArray" :key="index" :value="item">
                  {{ item }}
                </option>
              </select>
            </div>
          </div>

          <div class="col-md-2">
            <h4><b>Shkollimi:</b></h4>
          </div>
          <div class="col-md-10">
            <div class="form-group">
              <input type="text" class="form-control" name="shkollimi" placeholder="Shkollimi" v-model="user.shkollimi">
            </div>
          </div>

          <div class="col-md-2">
            <h4><b>Vendëlindja:</b></h4>
          </div>
          <div class="col-md-10">
            <div class="form-group">
              <input type="text" class="form-control" name="vendlindja" placeholder="Vendëlindja"
                v-model="user.vendlindja">
            </div>
          </div>

          <div class="col-md-2">
            <h4><b>Hobby:</b></h4>
          </div>
          <div class="col-md-10">
            <div class="form-group">
              <input type="text" class="form-control" name="hobby" placeholder="Hobby" v-model="user.hobby">
            </div>
          </div>

          <div class="form-group">
            <button type="submit" class="btn btn-primary pull-right cleftButton" name="submit" id="submit"><i
                class="fa fa-save"></i> &nbsp; Ruaje</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>