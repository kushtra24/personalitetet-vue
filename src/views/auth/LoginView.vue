<script lang="ts" setup>
import axiosClient from '@/axiosClient';
import { onMounted } from 'vue';
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
//import bcrypt from 'bcryptjs';
import type { UserType } from '@/types/UserType'



const router = useRouter();
const rightPanelActive = ref<boolean>(false);
const loginError = ref<boolean>(false);
const loading = ref<boolean>(false);
onMounted(() => {
  rightPanelActive.value = false;
});

const form = reactive<UserType>({
email: '',
password: '',
verified: 0
})


async function onLogin() {
  loading.value = true
  await axiosClient.get("sanctum/csrf-cookie");
  await axiosClient.post("api/login", {
    email: form.email,
    password: form.password //bcrypt.hashSync(, 12)
  }).then(() => {
    router.push("/");
    loading.value = false
  }).catch(() => {
    loginError.value = true;
    loading.value = false
  });
}

</script>

<template>
  <div class="container" :class="{ 'right-panel-active': rightPanelActive }">
    <div class="form-container sign-up-container">
      <form @submit.prevent="">
        <h1>Create Account</h1>
        <input type="text" placeholder="Name" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit" class="btn btn-primary">Sign Up</button>
      </form>
    </div>
    <div class="form-container sign-in-container">
      <form @submit.prevent="onLogin">
        <h1>Sign in</h1>
        <p v-if="loginError" class="text-red">{{ $t("authenticationFaild") }}</p>
        <input type="email" placeholder="Email" v-model="form.email" />
        <input type="password" placeholder="Password" v-model="form.password" />
        <a href="#">Forgot your password?</a>
        <button type="submit" class="btn btn-primary">Sign In <font-awesome-icon v-if="loading" :icon="['fas', 'spinner']" spin  /></button>
      </form>
    </div>
    <div class="overlay-container">
      <div class="overlay">
        <div class="overlay-panel overlay-left">
          <h1>Welcome Back!</h1>
          <p>To keep connected with us please login with your personal info</p>
          <button class="btn btn-white" id="signIn" @click="rightPanelActive = false">Sign In</button>
        </div>
        <div class="overlay-panel overlay-right">
          <h1>Hello, Friend!</h1>
          <p>Enter your personal details and start journey with us</p>
          <button class="btn btn-white" id="signUp" @click="rightPanelActive = true">Sign Up</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
button:hover {
  color: #00b1b3;
}

.container {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
    0 10px 10px rgba(0, 0, 0, 0.22);
  position: absolute;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 480px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

form {
  background-color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
}

input {
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
}


.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}

.sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}

.container.right-panel-active .sign-in-container {
  transform: translateX(100%);
}

.sign-up-container {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
}

.container.right-panel-active .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  animation: show 0.6s;
}

@keyframes show {

  0%,
  49.99% {
    opacity: 0;
    z-index: 1;
  }

  50%,
  100% {
    opacity: 1;
    z-index: 5;
  }
}

.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}

.container.right-panel-active .overlay-container {
  transform: translateX(-100%);
}

.overlay {
  background: #00b1b3;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #FFFFFF;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.container.right-panel-active .overlay {
  transform: translateX(50%);
}

.overlay-panel {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.overlay-left {
  transform: translateX(-20%);
}

.container.right-panel-active .overlay-left {
  transform: translateX(0);
}

.overlay-right {
  right: 0;
  transform: translateX(0);
}

.container.right-panel-active .overlay-right {
  transform: translateX(20%);
}

.social-container {
  margin: 20px 0;
}

.social-container a {
  border: 1px solid #DDDDDD;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  height: 40px;
  width: 40px;
}

.text-red {
  color: red;
}
</style>