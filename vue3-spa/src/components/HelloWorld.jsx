import { defineComponent, reactive, ref } from 'vue'
import axios from 'axios'

export default defineComponent({
  name: 'HelloWorld',
  props: {
    title: {
      type: [String],
      default: '',
    },
  },
  setup(props) {
    const state = reactive({ title: props.title, name: '', arr: [], tsArr: [] })

    axios.get('/api/get').then(({ data }) => {
      state.name = data.data.name
    })
    axios.get('/api/array').then(({ data }) => {
      state.arr = data.data.arr
    })
    let idx = 0
    const intPr = setInterval(() => {
      state.tsArr.push(Date.now())
      idx++
      if (idx > 9) {
        clearInterval(intPr)
      }
    }, 50)

    return () => (
      <>
        <article className="prose prose-sm">
          <h1>{state.title}</h1>
          <a
            href="https://github.com/sonofmagic/vue3-jsx-rendertron"
            target="_blank"
            rel="nofollow"
          >
            项目地址
          </a>
          <h2>作者:{state.name}</h2>
          <div className="flex space-x-4">
            <ul>
              {state.arr.map((x) => {
                return <li key={x}>{x}</li>
              })}
            </ul>
            <ul>
              {state.tsArr.map((x) => {
                return <li key={x}>{x}</li>
              })}
            </ul>
          </div>
        </article>
      </>
    )
  },
})
