import { defineComponent } from 'vue'
import Dashboard from '@/components/Dashboard.vue'
import './App.scss'
export default defineComponent({
  name: 'App',
  setup() {
   return () => (
      <Dashboard></Dashboard>
    )
  },
})
