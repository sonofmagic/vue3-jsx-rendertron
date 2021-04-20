import { defineComponent, reactive } from 'vue'
import HelloWorld from '@/components/HelloWorld.jsx'
import logo from '@/assets/logo.png'
import './App.scss'
export default defineComponent({
  name: 'App',
  components: {
    HelloWorld,
  },
  setup() {
    // const state = reactive({

    // })
    return () => (
      <div className="flex ">
        <img alt="Vue logo" src={logo} />
        <HelloWorld msg="Hello Vue 3 + Vite + JSX" />
      </div>
    )
  },
})
