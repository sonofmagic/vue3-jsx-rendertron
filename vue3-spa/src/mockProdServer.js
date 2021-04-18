import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'

import testModule from '../mock/test'
import roleMock from '../mock/role'
import userMock from '../mock/user'
export function setupProdMockServer () {
  createProdMockServer([...testModule, ...roleMock, ...userMock])
}
