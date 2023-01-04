const express = require('express')
const path = require('path')
const logger = require('morgan')
const multer = require('multer')
const fs = require('fs')

const app = express()
const port = 3000

const _path = path.join(__dirname, '/dist/')
// const _path2 = path.join(__dirname, '/dist/download/') // 안됨
console.log(_path)
app.use('/', express.static(_path)) // 
app.use(logger('tiny'))

app.use(express.json())
app.use(
  express.urlencoded({
    extended: true
  })
)


const storage = multer.diskStorage({
    destination: (req, res, cb) => {
      cb(null, _path) // ./dist/
    },
    filename: (req, res, cb) => {
      cb(null, res.originalname) // 
    }
  })
  
  let upload = multer({ storage: storage }) // 기본옵션은 dest

app.post('/inquiry', function (req, res) {

  let name = req.body.name
  let age = req.body.age
  let txt = req.body.txt
  let txtdata = name +':'+ age +':'+ txt

  fs.stat(_path + name + '.txt', (err, stats) => { //파일정보 구하는 함수 이용
    if (stats) {
      res.send(
        `<script>alert("${name}.txt 파일이름 중복으로 ${name}_1.txt 이름으로 저장합니다.");history.go(-1)</script>`
      )
      fs.writeFile(_path + name + '_1.txt', txtdata, (e) => {
        if (e) throw e
      })
    } else {
      fs.writeFile(_path + name + '.txt', txtdata, (e) => {
        
        if (e) throw e
        res.send(
          `<script>alert("${name}.txt 파일에 저장됨");location.replace('index.html');</script>`
        ) // history.go(-1) 선택 가능
      }) // end fs.writefile
    } // end if else
  }) // end fs.stat


})  // end app post

app.post('/fup', upload.single('upfile'), (req, res) => {
  // 파일 단독으로 전송옵션
  console.log(req.file) // app.post req 에서 파일 확인
  res.send(
    `<script>alert("파일 업로드 완료!");location.replace('index.html')</script>`
  ) //  ,, history.go(-1) 
})

app.get('/test', function( req, res ) {
    res.send( `ID : ${req.query.id} , Name : ${req.query.name} `)
    // localhost:3000/test?id=77&name=nickname
})

app.listen(port, () => {
  console.log(port + '에서 서버 동작 완료.')
})