const path = require('path')
// 分割代入で別名保存
const { engine: expressEdge } = require('express-edge')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Post = require('./database/models/Post')
const fileUpload = require('express-fileupload')

const app = new express()
mongoose.connect('mongodb://localhost/node-js-blog')
app.use(express.static('public'))
app.use(expressEdge)
// templateのpathを指定
app.set('views', path.join(__dirname, 'views'))
// formを受け取るbody-parserの設定
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true, }))
// fileUploadの使用
app.use(fileUpload())
// validation middlewareの作成と使用
const validateCreatePostMiddleware = (req, res, next) => {
  console.log(req.files)
  if (!req.files || !req.body.username || !req.body.title || !req.body.subtitle || !req.body.content) {
    return res.redirect('/posts/new')
  }
  // nextをcallしないとresponseがhangingになるので注意
  next()
}
// 特定のpathのみで使用
app.use('/posts/store', validateCreatePostMiddleware)

// getでPost modelからdataを取得したいのでasync awaitで非同期的に処理
app.get('/', async (req, res) => {
  const posts = await Post.find({})
  // renderでtemplateを表示, 第二引数で渡すdataをkey: valueで指定可
  res.render('index', {
    posts,
  })
})

app.get('/posts/new', (req, res) => {
  res.render('create')
})

app.post('/posts/store', (req, res) => {
  // req.filesでuploadされたfileにaccess
  const { image } = req.files
  // console.log(image)
  // image.mv(path, callback)で移動、先に保存用のposts folderを作成しておくこと
  image.mv(path.join(__dirname, 'public', 'posts', image.name), error => {
    // body-parserで受け取ったform値をreq.bodyで取得
    Post.create({
      ...req.body,
      // static assetはpublic folderにあるのは分かっているのでpublicをpathに含める必要はなし
      image: `/posts/${image.name}`,
    }, (error, post) => {
      res.redirect('/')
    })
  })
})

app.get('/about', (req, res) => {
  res.render('about')
})

// dynamic route
app.get('/post/:id', async (req, res) => {
  // req.params.paramNameでaccess可
  const post = await Post.findById(req.params.id)
  res.render('post', {
    post,
  })
})

app.get('/contact', (req, res) => {
  res.render('contact')
})

app.listen(4000, () => {
  console.log('App listening on port 4000')
})