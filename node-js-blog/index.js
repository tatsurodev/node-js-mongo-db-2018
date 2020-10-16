const path = require('path')
// 分割代入で別名保存
const { engine: expressEdge } = require('express-edge')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Post = require('./database/models/Post')

const app = new express()
mongoose.connect('mongodb://localhost/node-js-blog')
app.use(express.static('public'))
app.use(expressEdge)
// templateのpathを指定
app.set('views', path.join(__dirname, 'views'))
// formを受け取るbody-parserの設定
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true, }))

app.get('/', (req, res) => {
  // renderでtemplateを表示
  res.render('index')
})

app.get('/posts/new', (req, res) => {
  res.render('create')
})

app.post('/posts/store', (req, res) => {
  // body-parserで受け取ったform値をreq.bodyで取得
  Post.create(req.body, (error, post) => {
    res.redirect('/')
  })
})

app.get('/about', (req, res) => {
  res.render('about')
})

app.get('/post', (req, res) => {
  res.render('post')
})

app.get('/contact', (req, res) => {
  res.render('contact')
})

app.listen(4000, () => {
  console.log('App listening on port 4000')
})