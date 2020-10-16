const mongoose = require('mongoose')
const Post = require('./database/models/Post')

mongoose.connect('mongodb://localhost/node-js-test-blog')

/* create
// documentの作成、非同期的処理なのでcallbackを第二引数に指定可
Post.create({
  title: 'My first blog post',
  description: 'Blog post description',
  content: 'Lorem ipsum content',
}, (error, post) => {
  console.log(error, post)
})
*/

/* read
// documentsの取得
// findの第一引数でdocument検索、空objectの指定で全該当documents取得
Post.find({}, (error, posts) => {
  console.log(error, posts)
})
*/

// single documentの取得
// findByIdの第一引数のidはmongodbのid formatに従う必要あり、テキトーな文字列だとerror
Post.findById('5f8a0996fea5ea0deba8cf6a', (error, post) => {
  console.log(error, post)
})
