import { defineComponent } from 'vue'
// import HelloWorld from '@/components/HelloWorld.jsx'
// import logo from '@/assets/logo.png'
import Dashboard from '@/components/Dashboard.vue'
import './App.scss'
export default defineComponent({
  name: 'App',
  setup() {
    // const state = reactive({

    // })

    return () => (
      <Dashboard></Dashboard>
      // <div className="flex flex-col justify-center items-center h-screen w-screen">
      //   <div className="container mx-auto">
      //     <img className="w-56" alt="yangqiming logo" src={logo} />
      //     <HelloWorld title="Hello Vue 3 + Vite + JSX" />
      //   </div>
      // </div>
    )
  },
})
