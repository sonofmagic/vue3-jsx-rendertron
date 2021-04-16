import HelloWorld from '@/components/HelloWorld.vue'
import Logo from '@/assets/logo.png'
import GoodByeWorld from '@/components/GoodByeWorld'
export default {
  setup() {
    return () => <div class="home ">
      <div class="flex justify-center"><img alt="Vue logo" src={Logo} /></div>

      <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" ></HelloWorld>
      {
        GoodByeWorld
      }
    </div>
  }
}
