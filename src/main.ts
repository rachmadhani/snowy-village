import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import VueApexCharts from 'vue3-apexcharts'
import './style.css'
import App from './App.vue'

import Toast, { type PluginOptions } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

const app = createApp(App)

const toastOptions: PluginOptions = {
  // You can set your default options here
}

app.use(createPinia())
app.use(router)
app.use(VueApexCharts)
app.use(Toast, toastOptions)

app.mount('#app')
