const path = require('path')
// 分割代入で別名保存
const { engine: expressEdge } = require('express-edge')
const express = require('express')

const app = new express()
app.use(express.static('public'))
app.use(expressEdge)
// templateのpathを指定
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
  // renderでtemplateを表示
  res.render('index')
})

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'about.html'))
})

app.get('/post', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'post.html'))
})

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'contact.html'))
})

app.listen(4000, () => {
  console.log('App listening on port 4000')
})