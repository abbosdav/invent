import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import VueCookies from 'vue-cookies'
import Maska from 'maska'

const app = createApp(App)
.use(Maska)
.use(ElementPlusIconsVue)
.use(ElementPlus)
.use(store)
.use(router)
.use(VueCookies,  { expire: '1d'})

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.mount('#app')