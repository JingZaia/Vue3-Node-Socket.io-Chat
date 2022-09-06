import { createApp, ref, watchEffect, getCurrentInstance, provide } from 'vue'
import './style.scss'
import App from './App.vue'
import router from "./router/index"
import { createPinia } from "pinia"
const app = createApp(App)
// app.config.globalProperties.$io = ref<number>(10);
app.use(createPinia())
app.use(router).mount('#app')
