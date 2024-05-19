import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import App from './App.vue'
import './style.css'

const app = createApp(App)

const pinia = createPinia()
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: () => import("./routes/index.vue") },
    { path: '/game/:room_name', component: () => import('./routes/play.vue') },
  ],
})


app.use(router)
app.use(pinia)
app.mount('#app')
