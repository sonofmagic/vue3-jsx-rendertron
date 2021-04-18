// test
// prepub
// release
const fs = require('fs')
const path = require('path')

const rootList = fs.readdirSync('./')
const include = ['src', 'wwwroot', 'sls.js']
const exclude = rootList.reduce((acc, cur) => {
  if (!include.includes(cur)) {
    acc.push(cur)
  }
  return acc
}, [])

const {
  NODE_ENV,
  SLS_ENV,
  TENCENT_CLOUDBASE_ENVID,
  TENCENT_SECRET_KEY,
  TENCENT_SECRET_ID,
  TENCENT_APIGATEWAY_SERVICEID
} = process.env
// https://github.com/serverless-components/tencent-nuxtjs/blob/master/docs/configure.md
const config = {
  component: 'express',
  name: 'rendertron-service',
  stage: 'dev',
  inputs: {
    region: 'ap-shanghai',
    functionName: 'rendertron-service-function',
    serviceName: 'rendertron_service_gateway',
    runtime: 'Nodejs12.16',
    // serviceId为空时会主动去申请api网关
    serviceId: TENCENT_APIGATEWAY_SERVICEID,
    src: {
      src: './',
      bucket: 'sls-cloudfunction-ap-shanghai-code',
      exclude
    },
    layers: [
      {
        name: 'puppeteer',
        version: 2
      }
    ],
    functionConf: {
      timeout: 30,
      memorySize: 512,
      environment: {
        variables: {
          NODE_ENV,
          SLS_ENV,
          SLS_ENTRY_FILE: 'sls.js',
          TENCENT_CLOUDBASE_ENVID,
          TENCENT_SECRET_KEY,
          TENCENT_SECRET_ID
        }
      }
    },
    apigatewayConf: {
      isDisabled: true, // 是否禁用自动创建 API 网关功能
      protocols: ['http', 'https'],
      environment: 'release'
    }
  }
}

const customDomainsPath = path.resolve(__dirname, 'customDomains.js')
if (fs.existsSync(customDomainsPath)) {
  const customDomains = require('./customDomains.js')
  config.inputs.apigatewayConf.customDomains = customDomains
}
module.exports = config
