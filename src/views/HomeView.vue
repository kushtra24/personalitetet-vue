<script setup lang="ts">
import MessageComponent from '@/components/MessageComponent.vue';
</script>

<template>
  <div class="container">
    <section id="heading-welcomepage">
      <h1>{{ $t('findYourPersonalityType') }}</h1>
      <router-link :to="{ name: 'testPage'}" class="btn btn-primary">Fillo vlerësimin</router-link>
      <br>
      <img src="/images/homepage.png" class="img-responsive" alt="homepage image">
    </section>

    <section id="welcome-content-middle">
      <i class="fas fa-heart fa-5x"></i>
      <h3>Pak rreth teorisë së përgjithshme të vlerësimit</h3>
      <p>Bazuar në studimet dhe mësimet e Carl Jung-ut mbi tipet e personalitetit, ne kemi ndërtuar këtë pyetësor i cili
        jep një indikator për orientimin e personalitetit tënd.</p>
    </section>

    <section id="cka_vlerson" class="col-md-offset-31">
      <h1>Ku të ndihmon ky vlerësim:</h1>

      <div class="komunikim col-md-6">
        <div class="inner-part">
          <font-awesome-icon :icon="['fas', 'comments']" />
          <h2>KOMUNIKIM</h2>
          <p>Disa njerëz janë natyrshëm të prirur që të përqëndrohen në pikëpamje kryesore dhe të flasin për ide të mëdha.
            Të tjerët përqëndrohen më shumë në detaje, fakte dhe në atë që duket qartë. Duke kuptuar se si njerëzit marrin
            dhe i shprehin informacionet, ti do ta kesh më të lehtë të diskutosh me ta.</p>
        </div>
      </div>
      <div class="karrier col-md-6">
        <div class="inner-part">
          <font-awesome-icon :icon="['fas', 'user-tie']" />
          <h2>PROFESION</h2>
          <p>Gjetja e profesionit të duhur mund të jetë një kërkim i lodhshëm dhe sfidues. Sidoqoftë, vlerësimi i
            personaliteti tënd mund të të ndihmojë pasiqë duke e njohur veten, duke njohur nevojat e atyre qe janë përreth
            teje dhe duke identifikuar fushat në të cilat mund të lulëzosh natyrshëm, qasja jote në zhvillimin e karrierës
            bëhet shumë më e lehtë.</p>
        </div>
      </div>
      <div class="lidhje col-md-6">
        <div class="inner-part">
          <i class="far fa-heart"></i>
          <h2>LIDHJE BASHKËSHORTORE</h2>
          <p>Ndoshta bashkëshorti/ja jote nuk të kupton dhe e ke të vështirë të komunikosh me të. A jeni duke thënë gjërat
            e njejta por në mënyra të ndryshme? Apo ndoshta po kërkon të krijosh ekuilibrin në një mënyrë që të plotëson
            më shumë. Preferencat e personalitetit tënd mund të kenë dicka për të thënë për këtë gjë.</p>
        </div>
      </div>
      <div class="vendimarrje col-md-6">
        <div class="inner-part">
          <i class="far fa-compass"></i>
          <h2>VENDIMMARRJE</h2>
          <p>Shumë njerëz i ofrohen vendimmarrjes në aspektin e rezultateve të drejtëpërdrejta dhe implikimeve (p.sh.,
            nëse kthehem në shkollë, do të kushtojë kaq). Sidoqoftë, rezultatet e nënkuptuara dhe ato që ndikojnë në
            thelbin tënd nuk janë gjithmonë aq të dukshme (p.sh., a do të përshtatet ky format i mësimdhënies për mua?).
            Ne mund t'ju ndihmojmë t'i zbuloni këto.</p>
        </div>
      </div>
    </section>

    <!-- <section class="testimonials">
      <h1>Çfarë thonë të tjerët?</h1>
      <i class="fas fa-quote-left fa-5x quote-icon"></i>
      <div class="owl-carousel">
        <div class="col-md-8 col-md-offset-2">
          <p>Ishte fascinuese të lexojë rreth përsonalitetit tim, ishin tejët të sakta, nuk besoja çfarë isha duke lëxuar.
            Aq të sakta ishin sa që mendoja që është shkruar posaqërisht për mua</p>
          <div class="avatar"><img src="{{ asset('images/enfj.png') }}" alt="testimonial avatar"></div>
        </div>

      <div class="col-md-8 col-md-offset-2">
        <p>Jetën e kam kaluar duke menduar se jamë nga një plant tjetër apo diçka të till. Kur e përfundova pyetsorin
          pash që nuk jamë e vetmja por ka më shumë njerëz sikur unë, që nga ajo ditë jamë më e lumtur në lëkuren time
        </p>
        <div class="avatar"><img src="{{ asset('images/INFJ.png') }}" alt="testimonial avatar"></div>
      </div>
    </div>
  </section> -->
</div>
</template>
