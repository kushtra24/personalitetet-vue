<script setup lang="ts">
import { onMounted } from 'vue';
import LogoComponent from './LogoComponent.vue';
import { isAuthenticatedStore } from '@/stores/authStore'
const authStore = isAuthenticatedStore();

onMounted(() => {
  if(authStore.isAuthenticated) {
    console.log(authStore.isAuthenticated);
  }
});
async function logout() {
  document.cookie = "XSRF-TOKEN=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  authStore.authenticateUser(false);
}
</script>

<template>
  <router-link :to="{name: 'home'}">
    <LogoComponent width="250" />
  </router-link>

  <input type="checkbox" id="nav-toggle" class="nav-toggle">
  <nav>
    <ul>
      <li>
        <router-link :to="{ name: 'home' }">{{ $t('start') }}</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'types' }">{{ $t('types') }}</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'blog' }">{{ $t('blog') }}</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'login' }" v-if="!authStore.isAuthenticated">{{ $t('login') }}</router-link>
        <router-link :to="{name: 'home'}" @click="logout" v-else>{{ $t('logout') }}</router-link>
      </li>
    </ul>
  </nav>
  <label for="nav-toggle" class="nav-toggle-label">
    <span></span>
  </label>
</template> 

<style lang="scss">
*,
*::before,
*::after {
  box-sizing: border-box;
}


/* Nav Styles */

header {
  background: $body-bg;
  text-align: center;
  position: relative;
  width: 100%;
  z-index: 999;
  user-select: none;
  padding: 15px;
}

nav {
  position: absolute;
  text-align: left;
  top: 100%;
  left: 0;
  width: 100%;
  background: $body-bg;
  transform: scale(1, 0);
  transform-origin: top;
  transition: transform 400ms ease-in-out;

  ul {
    margin: 0;
    padding: 0;
    list-style: none;

    li {
      margin-bottom: 1em;
      margin-left: 1em;
    }
  }

  a {
    color: black;
    text-decoration: none;
    font-size: 1.1rem;
    text-transform: uppercase;
    opacity: 0;
    transition: opacity 150ms ease-in-out;
    font-family: 'Montserrat', sans-serif;
    font-size: 18px;
    text-transform: uppercase;

    &:hover {
      color: black;
    }
  }
}

.nav-toggle {
  display: none;

  &:checked~nav {
    transform: scale(1, 1);
  }

  &:checked~nav a {
    opacity: 1;
    transition: opacity 250ms ease-in-out 250ms;
  }
}

.nav-toggle-label {
  position: absolute;
  left: 0;
  top: 0;
  margin-left: 1em;
  height: 100%;
  display: flex;
  align-items: center;

  &:hover {
    cursor: pointer;
  }

  span,
  span::before,
  span::after {
    display: block;
    background: black;
    width: 1.85em;
    height: 2px;
    border-radius: 2px;
    position: relative;
  }

  span::before,
  span::after {
    content: "";
    position: absolute;
  }

  span::before {
    bottom: 7px;
  }

  span::after {
    top: 7px;
  }
}


@media screen and (min-width:800px) {
  .nav-toggle-label {
    display: none;
  }

  header {
    display: grid;
    grid-template-columns: 1fr auto minmax(600px, 3fr) 1fr;
  }

  .logo {
    grid-column: 2 / span 1;
  }

  nav {
    all: unset;
    grid-column: 3 / 4;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    ul {
      display: flex;
    }

    li {
      margin-left: 3em;
      margin-bottom: 0;
    }

    a {
      opacity: 1;
      position: relative;

      &::before {
        content: "";
        display: block;
        height: 5px;
        background: rgba(50, 180, 230, .5);
        position: absolute;
        top: -.7em;
        left: 0;
        right: 0;
        transform: scale(0, 1);
        transition: transform 250ms ease-in-out;
      }

      &:hover::before {
        transform: scale(1, 1);
      }
    }
  }
}
</style>