const express = require('express')
const userModel = require('../model/user')
const headModel = require('../model/head')
const solutionModel = require('../model/solution')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const route = express.Router()
const jwtSecret = process.env.JWT_SECRET

route.get('/', (req, res) => {
  res.send({ id: 'Hello World!' })
})

route.post('/signup', async (req, res) => {
  const saltPasswd = await bcrypt.genSalt(10)
  const securePasswd = await bcrypt.hash(req.body._passwd, saltPasswd)

  const signUpUser = new userModel({
    _id: req.body._id,
    _passwd: securePasswd,
    _gender: req.body._gender,
    _age: req.body._age,
    _height: req.body._height,
    _weight: req.body._weight,
  })

  signUpUser
    .save()
    .then((data) => {
      res.json(data)
    })
    .catch((error) => {
      res.json(error)
    })
})

route.post('/authentication', async (req, res) => {
  userModel
    .findOne({
      _id: req.body._id,
    })
    .then(async (ret) => {
      if (ret) {
        const cmp = await bcrypt.compare(req.body._passwd, ret._passwd)
        if (cmp) {
          let token = jwt.sign(
            {
              _id: ret._id,
            },
            jwtSecret,
            {
              expiresIn: '1d',
            },
          )
          let _send = {
            token: token,
            _id: ret._id,
            _gender: ret._gender,
            _age: ret._age,
            _height: ret._height,
            _weight: ret._weight,
          }
          res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept')
          res.send(_send)
        } else {
          res.send('Wrong username or password')
        }
      } else {
        res.send('Wrong username or password')
      }
    })
})

route.post('/check_duplicate', (req, res) => {
  headModel
    .findOne({
      Username: req.body.Username,
    })
    .then((ret) => {
      if (ret) {
        res.send(ret.disablePasswd)
      } else {
        res.send('nothing')
      }
    })
})

route.post('/check_passwd', (req, res) => {
  headModel
    .findOne({
      Username: req.body.Username,
    })
    .then((ret) => {
      if (ret) {
        res.send(ret.disablePasswd)
      } else {
        res.send('nothing')
      }
    })
})

route.post('/use_passwd', (req, res) => {
  headModel
    .findOne({
      Username: req.body.Username,
    })
    .then(async (ret) => {
      if (ret) {
        const cmp = await bcrypt.compare(req.body.Passwd, ret.Passwd)
        if (cmp) {
          res.send(ret)
        }
      }
      res.send(false)
    })
})

route.post('/get_result', (req, res) => {
  headModel
    .findOne({
      Username: req.body.Username,
    })
    .then((ret) => {
      if (ret) {
        res.send(ret)
      } else {
        res.send(false)
      }
    })
})

route.post('/upload_result', async (req, res) => {
  let securePasswd = ''
  console.log(req.body)
  if (req.body.disablePasswd === false) {
    const saltPasswd = await bcrypt.genSalt(10)
    securePasswd = await bcrypt.hash(req.body.Passwd, saltPasswd)
  }
  await headModel.updateOne(
    { Username: req.body.Username },
    {
      Username: req.body.Username,
      Passwd: req.body.disablePasswd === false ? securePasswd : '',
      disablePasswd: req.body.disablePasswd,
    },
    { upsert: true },
  )
  headModel
    .updateOne(
      { Username: req.body.Username },
      { $push: { History: req.body.result } },
      { upsert: true },
    )
    .then((ret) => {
      res.send('Done')
    })
})

route.post('/solution', (req, res) => {
  console.log(req.body.Comment)
  solutionModel.findOne({ result: req.body.Comment }).then((ret) => {
    console.log(ret.solution)
    res.send(ret.solution)
  })
})

route.post('/delete_result', (req, res) => {
  headModel
    .updateOne(
      {
        Username: req.body.Username,
      },
      { $pull: { History: { Image: req.body.Image } } },
    )
    .then((ret) => {
      res.send(true)
    })
})

route.post('/memo_update', (req, res) => {
  headModel
    .updateOne(
      { Username: req.body.Username, 'History.Image': req.body.Image },
      { 'History.$.Memo': req.body.Memo },
    )
    .then((ret) => {
      res.send(ret)
    })
})

module.exports = route
