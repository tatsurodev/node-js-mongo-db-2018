const path = require('path')
// 分割代入で別名保存
const { engine: expressEdge } = require('express-edge')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
// controller
const homePageController = require('./controllers/homePage')
const createPostController = require('./controllers/createPost')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const createUserController = require('./controllers/createUser')
const storeUserController = require('./controllers/storeUser')
// middleware
const storePost = require('./middleware/storePost')

// 全controllerで使用する可能性の高いdb, template, fileupload系の設定は個別のcontrollerに切り分けずに、起動fileに残しておくとbetter。modelはcontroller固有のものなのでcontroller側でrequireするとよい
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
// middlewareを特定のpathのみで使用
app.use('/posts/store', storePost)

// postController
app.get('/', homePageController)
app.get('/posts/new', createPostController)
app.post('/posts/store', storePostController)
// dynamic route
app.get('/post/:id', getPostController)

// userController
app.get('/auth/login', loginController)
app.post('/users/login', loginUserController)
app.get('/auth/register', createUserController)
app.post('/users/register', storeUserController)

app.listen(4000, () => {
  console.log('App listening on port 4000')
})