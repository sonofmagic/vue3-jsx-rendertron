import { defineComponent } from 'vue'
import HelloWorld from '@/components/HelloWorld.jsx'
import logo from '@/assets/logo.png'
import './App.css'
export default defineComponent({
  name: 'App',
  components: {
    HelloWorld
  },
  setup () {
    return () => <>
      <img alt="Vue logo" src={logo} />
      <HelloWorld msg="Hello Vue 3 + Vite + JSX" />
    </>
  }
})
