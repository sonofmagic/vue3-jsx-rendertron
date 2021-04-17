import './uni.scss'
import { createApp } from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './mock/index'
createApp(App).use(store).use(router).mount('#app')
