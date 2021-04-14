import './App.scss'
import './App.scoped.scss'
import style from './App.module.scss'

export default {
  setup() {
    return () => <>
      <div id="nav" class={style.nav}>
        <div class={style.icebreaker}>This is icebreaker</div>
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
      </div>
      <router-view />
    </>
  }
}
