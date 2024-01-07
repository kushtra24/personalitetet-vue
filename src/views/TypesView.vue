<script lang="ts" setup>
import { ref } from 'vue';
import type { PersonalityType } from '../types/PersonalityType';


const personalityTypes = ref<PersonalityType>();

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

        <!-- <div class="col-md-3 the-type" v-for="personalityType in personalityTypes" :key="personalityType.id">
          <router-link :to="{ name: 'type', params: {type: personalityType.type} }">
            <img :src="`public/images/${personalityType.type_img}`" :alt="`tipi-${personalityType.name}`">
            <h4>{{ personalityType.name }}</h4>
            <h5>{{ personalityType.type }}</h5>
          </router-link>
        </div> -->


      </div>

      <div id="vetvetja" class="type-group row">
        <h1><strong>{{$t('self')}}</strong></h1>


        
        <!-- <div class="col-md-3 the-type">
          <a href="{{ action('TipetController@show', [$tipi]) }}">
            <img src="{{ $tipi->hasMedia('tipiImg') ? $tipi->firstMedia('tipiImg')->getUrl() : $tipi->type_img }}"
              alt="tipi">
              <h4>{{ personalityType.name }}</h4>
            <h5>{{ personalityType.type }}</h5>
          </a>
        </div> -->

        

      </div>

      <div id="shoqeri" class="type-group row">
        <h1><strong>{{$t('friends')}}</strong></h1>


        
        <!-- <div class="col-md-3 the-type">
          <a href="{{ action('TipetController@show', [$tipi]) }}">
            <img src="{{ $tipi->hasMedia('tipiImg') ? $tipi->firstMedia('tipiImg')->getUrl() : $tipi->type_img }}"
              alt="tipi">
              <h4>{{ personalityType.name }}</h4>
            <h5>{{ personalityType.type }}</h5>
          </a>
        </div> -->

        

      </div>

      <div id="mbledhje" class="type-group row">
        <h1><strong>{{$t('meeting')}}</strong></h1>
        

        <!-- <div class="col-md-3 the-type">
          <a href="{{ action('TipetController@show', [$tipi]) }}">
            <img src="{{ $tipi->hasMedia('tipiImg') ? $tipi->firstMedia('tipiImg')->getUrl() : $tipi->type_img }}"
              alt="tipi">
              <h4>{{ personalityType.name }}</h4>
            <h5>{{ personalityType.type }}</h5>
          </a>
        </div> -->


      </div>
    </section>
  </div>
</template>