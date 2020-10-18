const path = require('path')
// 分割代入で別名保存
const { engine: expressEdge } = require('express-edge')
const express = require('express')
const expressSession = require('express-session')
const connectMongo = require('connect-mongo')
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
const auth = require('./middleware/auth')
const storePost = require('./middleware/storePost')

// 全controllerで使用する可能性の高いdb, template, fileupload系の設定は個別のcontrollerに切り分けずに、起動fileに残しておくとbetter。modelはcontroller固有のものなのでcontroller側でrequireするとよい
const app = new express()
mongoose.connect('mongodb://localhost/node-js-blog')
// sessionをconnect-mongoでmongodbに保存する
const mongoStore = connectMongo(expressSession)
// sessionの設定
app.use(expressSession({
  // secretで指定した文字列を使ってクッキーIDを暗号化、必須項目
  secret: 'secret',
  store: new mongoStore({
    // これより先にmongooseでmongodbとのconnectionが成されている必要がある
    mongooseConnection: mongoose.connection,
  }),
}))
app.use(express.static('public'))
app.use(expressEdge)
// templateのpathを指定
app.set('views', path.join(__dirname, 'views'))
// formを受け取るbody-parserの設定
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true, }))
// fileUploadの使用
app.use(fileUpload())

// postController
app.get('/', homePageController)
// 第二引数以降、順にmiddlewareが実行されcontrollerの処理にたどり着く
app.get('/posts/new', auth, createPostController)
app.post('/posts/store', auth, storePost, storePostController)
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