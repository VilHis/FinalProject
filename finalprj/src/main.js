import { createRouter, createWebHistory } from 'vue-router';
import { createApp } from 'vue';
import App from "./App.vue"

import AboutUs from "./components/AboutUs.vue"
import PersonalTab from "./components/Personal.vue"
import RegisterUser from './components/Sign/Register.vue'
import SignUpIn from './components/Sign/Sign.vue'
import MainPage from './components/MainPage.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
      {name:'mainpage', path: "/", component: MainPage },
      {name:'about', path: "/aboutus", component: AboutUs },
      {name:'tasktable', path: "/table", component: PersonalTab },
      {name:'signup', path: "/signup", component: RegisterUser },
      {name:'SignUpIn', path: "/signin", component: SignUpIn},
    ],
  });

const app = createApp (App)
app.use(router)
.mount('#app')
