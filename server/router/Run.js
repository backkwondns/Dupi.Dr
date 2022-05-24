const express = require('express')
const route = express.Router()
const multer = require('multer')
const { spawn } = require('child_process')
const fs = require('fs')
const FormData = require('form-data')
const axios = require('axios')

const send_external = (formData) => {
  axios
    .post('http://fkdnsem.iptime.org:31000/upload_image', formData, {
      headers: formData.getHeaders(),
    })
    .then((ret) => {
      console.log('sended')
    })
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const path = `../public/images/${req.body.Username}/`
    fs.mkdirSync(path, { recursive: true })
    cb(null, path)
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`)
  },
})

const upload = multer({ storage: storage })

route.post('/upload_image', upload.single('head_skin'), (req, res) => {
  const python = spawn('python3', [
    './Python/resize.py',
    `/images/${req.body.Username}/${req.file.filename}`,
  ])

  python.on('close', async (ret) => {
    let path_external = req.file.filename
    path_external = path_external.split('.')
    path_external[path_external.length - 1] = '_resize.jpg'
    path_external = path_external.join('')

    const formData = new FormData()
    formData.append('username', req.body.Username)
    await formData.append(
      'file',
      fs.createReadStream(`../public/images/${req.body.Username}/${path_external}`),
    )

    await send_external(formData)

  })

  res.send({ Imagepath: `/images/${req.body.Username}/${req.file.filename}` })
})

route.post('/model_1', (req, res) => {
  let dataToSend
  const python = spawn('python3', ['./Python/model1.py'])
  python.stdout.on('data', (data) => {
    dataToSend = data.toString()
  })
  python.on('close', (ret) => {
    res.send(dataToSend)
  })
})

route.post('/model_2', (req, res) => {
  let dataToSend
  const python = spawn('python3', ['./Python/model2.py'])
  python.stdout.on('data', (data) => {
    dataToSend = data.toString()
  })
  python.on('close', (ret) => {
    res.send(dataToSend)
  })
})

route.post('/model_3', (req, res) => {
  let dataToSend
  const python = spawn('python3', ['./Python/model3.py'])
  python.stdout.on('data', (data) => {
    dataToSend = data.toString()
  })
  python.on('close', (ret) => {
    res.send(dataToSend)
  })
})

route.post('/model_4', (req, res) => {
  let dataToSend
  const python = spawn('python3', ['./Python/model4.py'])
  python.stdout.on('data', (data) => {
    dataToSend = data.toString()
  })
  python.on('close', (ret) => {
    res.send(dataToSend)
  })
})

route.post('/model_5', (req, res) => {
  let dataToSend
  const python = spawn('python3', ['./Python/model5.py'])
  python.stdout.on('data', (data) => {
    dataToSend = data.toString()
  })
  python.on('close', (ret) => {
    res.send(dataToSend)
  })
})

route.post('/model_6', (req, res) => {
  let dataToSend
  const python = spawn('python3', ['./Python/model6.py'])
  python.stdout.on('data', (data) => {
    dataToSend = data.toString()
  })
  python.on('close', (ret) => {
    res.send(dataToSend)
  })
})

route.post('/define_result', (req, res) => {
  let dataToSend
  const python = spawn('python3', [
    './Python/define.py',
    req.body.r0,
    req.body.r1,
    req.body.r2,
    req.body.r3,
    req.body.r4,
    req.body.r5,
  ])
  python.stdout.on('data', (data) => {
    dataToSend = data.toString()
  })
  python.on('close', (ret) => {
    res.send(dataToSend)
  })
})

module.exports = route
