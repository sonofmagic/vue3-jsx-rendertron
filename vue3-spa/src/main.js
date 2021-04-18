import { createApp } from 'vue'
import App from './App.jsx'
import { setupProdMockServer } from './mockProdServer'
setupProdMockServer()
createApp(App).mount('#app')
