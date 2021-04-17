import Mock from 'mockjs'

Mock.setup({
  timeout: '100-600'
})

Mock.mock(/^api\/data/, 'GET', {
  'object|2-4': {
    110000: '北京市',
    120000: '天津市',
    130000: '河北省',
    140000: '山西省'
  }
})
