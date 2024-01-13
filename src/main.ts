// import './assets/scss/global.scss'
// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { createI18n } from 'vue-i18n'
import enUS from './locales/en.json'
import alKS from './locales/al.json'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faComments, faUserTie, faSpinner } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faComments, faUserTie, faSpinner);

const i18n = createI18n({
  legacy: false, 
  locale: 'en', // set locale
  fallbackLocale: 'en', // set fallback locale
  messages: {
    'en': enUS,
    'al': alKS
  }
})

const app = createApp(App)

.component('font-awesome-icon', FontAwesomeIcon)
app.use(createPinia())
app.use(router)
app.use(i18n)
app.mount('#app')
