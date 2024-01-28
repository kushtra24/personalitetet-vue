<script lang="ts" setup>
import { ref } from 'vue';
import LogoComponent from './LogoComponent.vue';

// someting

const thisYear = ref<Number>(new Date().getFullYear());
const counter = ref<Number>(5555);
</script>

<template>
  <hr>
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <router-link :to="{ name: 'home' }">
          <LogoComponent width="210" />
        </router-link>
        <p class="footer-description">Merr një përshkrim të vetvetes, mëso më tepër rreth fuqive dhe dobësive tua.</p>
        <p>Vlersime deri më tani {{ counter }}</p>
        <div class="footer-solcial-icons">
          <!-- <a href="#"><i class="fab fa-facebook fa-2x"></i></a>
                    <a href="#"><i class="fab fa-instagram fa-2x"></i></i></a>
                    <a href="#"><i class="fab fa-youtube-square fa-2x"></i></i></a> -->
        </div>
        <router-link :to="{name: 'testPage'}" class="btn btn-default footer-assesment-button">Fillo Vlersimin</router-link>
      </div>
      <div class="col-md-3">
        <h4>
          Artikujt
        </h4>
        <ul>
          @foreach($posts as $post)
          <li> <a href="/blog/{{ $post->id }}" title="{{$post->title}}">{!! str_limit($post->title, 40) !!}...</a></li>
          <hr>
          @endforeach
        </ul>
      </div>

      <div class="col-md-3">
        <h4>
          Më shumë
        </h4>
        <ul>
          <li><a href="/faqe/teoria_jone"><i class="fas fa-caret-right"></i> Teoria Jonë</a></li>
          <li><a href="/faq"><i class="fas fa-caret-right"></i> Pyetje të Shpeshta</a></li>
          <router-link :to="{ name: 'about' }">{{ $t('about') }}</router-link>
          <li><a href="{{ route('login') }}"><i class="fas fa-caret-right"></i> Kyqu</a></li>
        </ul>
      </div>

      <div class="col-md-3">
        <h4>
          E nevojshme
        </h4>
        <ul>
          <li> <a href="/faqe/impressum"><i class="fas fa-caret-right"></i> Impresum</a></li>
          <li> <a href="/faqe/kushtet_perdorimit"><i class="fas fa-caret-right"></i> Kushtet e përdorimit</a></li>
          <li> <a href="/faqe/politikat_privatesise"><i class="fas fa-caret-right"></i> Politika e privatesisë</a></li>
        </ul>
      </div>
    </div><!-- row -->
    <hr>
    <div class="row">
      <div class="copyRight col-md-6">
        <p> &copy; Personalitetet
          {{ thisYear }}. Të gjitha të drejtat e rezervuara. </p>
      </div>
      <div class="designedBy col-md-6">
        <p> Dizajnuar dhe ndërtuar nga: <a href="http://kushtrim.net" target="_blank"> Kushtrim.net</a></p>
      </div>
    </div>
  </div>
</template>