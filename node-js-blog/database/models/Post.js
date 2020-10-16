const mongoose = require('mongoose')

// schemaを定義し、collectionの中のdocumentの構造を明記
const PostSchema = new mongoose.Schema({
  title: String,
  description: String,
  content: String,
})

// modelの作成
const Post = mongoose.model('Post', PostSchema)

module.exports = Post
