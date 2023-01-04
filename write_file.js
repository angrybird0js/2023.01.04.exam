const express = require('express')
const path = require('path')
const logger = require('morgan')
const fs = require('fs') // 내장모듈

const app = express()
const port = 3000
const _path = path.join(__dirname, '/')
console.log(_path)
app.use('/', express.static(_path))
app.use(logger('tiny'))

// CRUD
const file = 'test1'
const data = '와! nodejs로 작성했다!!!'
fs.writeFile(_path + file + '.txt', data, (e) => {
  if (e) console.log(e)
  console.log('파일이 작성완료 되었습니다.')
})

app.listen(port, () => {
  console.log(port + '에서 서버 동작 완료.')
})