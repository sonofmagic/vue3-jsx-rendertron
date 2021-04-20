require('dotenv').config()
const fs = require('fs')
const path = require('path')
const os = require('os')
const COS = require('cos-nodejs-sdk-v5')
const klaw = require('klaw')
const isWindows = os.type() === 'Windows_NT'

const root = path.resolve(__dirname, '..')
const {
  TENCENT_SECRET_KEY,
  TENCENT_SECRET_ID,
  TENCENT_COS_CDN_BUCKET,
  TENCENT_COS_CDN_REGION,
} = process.env

const cos = new COS({
  SecretId: TENCENT_SECRET_ID,
  SecretKey: TENCENT_SECRET_KEY,
})

const uploadFileOption = {
  Bucket: TENCENT_COS_CDN_BUCKET,
  Region: TENCENT_COS_CDN_REGION,
  CacheControl: 'public,max-age=31536000',
}

function putObject(opts) {
  return new Promise((resolve, reject) => {
    cos.putObject(opts, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

async function uploadFile(Key, Body, opts) {
  try {
    await putObject(
      Object.assign(
        {
          Key,
          Body,
        },
        uploadFileOption,
        opts
      )
    )
  } catch (err) {
    console.log(err)
  }
}
const cloudPath = require('../publicPath.js')

async function uploadDir(prefix, targetPath) {
  const absTargetPath = path.resolve(root, targetPath)
  for await (const file of klaw(targetPath)) {
    const { path: absPath, stats } = file
    if (stats.isFile()) {
      let key = absPath.replace(absTargetPath, '')
      if (isWindows) {
        key = key.replace(/\\/g, '/')
      }
      await uploadFile(prefix + key, fs.createReadStream(absPath))
    }
  }
}

async function main() {
  await uploadDir(cloudPath, 'dist')
}

main()
