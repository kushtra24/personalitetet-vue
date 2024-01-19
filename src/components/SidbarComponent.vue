<script lang="ts" setup>
import axiosClient from '@/axiosClient';
import { isAuthenticatedStore } from '@/stores/AuthStore'
import { ref, onMounted, onBeforeMount } from 'vue';
const authStore = isAuthenticatedStore();
const authUserTestResults = ref();

onMounted(() => {

  axiosClient.get('api/home')
  .then((res) => {
    authUserTestResults.value = res;
  })
  .catch((err) => {
    console.log('error getting user results', err);
  })
});

defineProps({
  type: String
})

// var targetOffset = $("#stickySidebar").offset().top;

// var $w = $(window).scroll(function(){
//     if ( $w.scrollTop() > targetOffset && screen.width > 960) {   
//         $('#content').css('display', 'flex');
//     } else {
// 		$('#content').css('display', '');
//     }
// });



</script>

<template>
  <div class="col-md-3">
    <template v-if="authStore.isAuthenticated && authUserTestResults?.length">
      <div class="placehodler">
        <h3>Resultatet e juaja </h3>
        <p> {{ authUserTestResults?.finaltype }}</p>
        <br>
        <p> {{ authUserTestResults?.intro_extro }} {{authUserTestResults?.first_final_procent_rez }}% </p>
        <p> {{ authUserTestResults?.intu_sens }} {{authUserTestResults?.ns_final_procent_rez }}% </p>
        <p> {{ authUserTestResults?.feeling_thinking }} {{authUserTestResults?.ft_final_procent_rez }}% </p>
        <p> {{ authUserTestResults?.judging_perspecting }} {{authUserTestResults?.jp_final_procent_rez }}% </p>
        <hr>
        <p> {{ authUserTestResults?.created_at }}</p>
      </div>
      <div class="placehodler">
        <h3>Resultatet e juaja </h3>
        <p>Get type Results from cookies or state</p>
        <br>
      </div>
    </template>
    <template v-else>
      <div class="notLogedIn">
        <h3>Sapo Erdhe?</h3>
        <router-link :to="{ name: 'testPage' }" class="btn btn-default">Fillo Vlersimin</router-link>
        <p v-if="!authUserTestResults">Nëse ke llogari <router-link :to="{ name: 'login' }"> Kyqu</router-link></p>
      </div>
    </template>


    <div id="stickySidebar">
      <h4>Eksploroje {{ type }}n</h4>
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
  </div>
</template>

<style scoped>
	#stickySidebar{
		background: white;
		padding: 15px 0;
		position: sticky;
		top: 20px;
	}
	#stickySidebar li{
		list-style: none;
		margin: 5px 0;
		text-transform: uppercase;
	}
	#stickySidebar h4{
		text-align: center;
		font-weight: 700;
	}
</style>