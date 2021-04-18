import { defineComponent, reactive, ref } from 'vue'
import axios from 'axios'
export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: {
      type: [String],
      default: ''
    }
  },
  setup (props) {
    const { msg } = props
    const state = reactive({ name: '' })

    axios.get('/api/get').then(({ data }) => {
      state.name = data.data.name
    })

    const requestLists = ref([
      {
        name: 'Get Request',
        info: '暂无数据',
        show: false
      },
      {
        name: 'Post Request',
        info: '暂无数据',
        show: false
      }
    ])
    const getRoleById = () => {
      requestLists.value[0].show = true
      axios.get('/api/getRoleById', { params: { id: 1 } }).then(({ data }) => {
        requestLists.value[0].info = data
        requestLists.value[0].show = false
      })
    }
    const createUser = () => {
      requestLists.value[1].show = true
      axios
        .post('/api/createUser', {
          name: 'vben',
          gender: 'man'
        })
        .then(({ data }) => {
          requestLists.value[1].info = data
          requestLists.value[1].show = false
        })
    }
    getRoleById()
    createUser()
    return () => (
      <>
        <h1>{msg}</h1>
        <p>
          <a
            href="https://github.com/sonofmagic/vue3-jsx-rendertron"
            target="_blank"
          >

            项目地址
          </a>
        </p>
        <h2>作者:{state.name}</h2>
      </>
    )
  }
})
