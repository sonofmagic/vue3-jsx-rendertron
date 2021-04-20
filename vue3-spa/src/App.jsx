import { defineComponent } from 'vue'
import HelloWorld from '@/components/HelloWorld.jsx'
import logo from '@/assets/logo.png'
import './App.scss'
export default defineComponent({
  name: 'App',
  setup() {
    // const state = reactive({

    // })

    return () => (
      <div className="flex flex-col justify-center items-center h-screen w-screen">
        <img alt="Vue logo" src={logo} />
        <HelloWorld title="Hello Vue 3 + Vite + JSX" />
      </div>
    )
  },
})
