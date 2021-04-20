import Mock from 'mockjs'

import testModule from '../mock/test'
import roleMock from '../mock/role'
import userMock from '../mock/user'
export function setupProdMockServer() {
  ;[...testModule, ...roleMock, ...userMock].forEach((x) => {
    Mock.mock(x.url, x.method, x.response)
  })

  Mock.setup({
    timeout: '50-200',
  })
}
