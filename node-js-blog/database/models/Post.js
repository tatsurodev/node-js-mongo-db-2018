const mongoose = require('mongoose')

// schemaを定義し、collectionの中のdocumentの構造を明記
const PostSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  content: String,
  username: String,
  image: String,
  // objectで指定することでdefault値の設定が可能、type keyでtype指定が必須
  createdAt: {
    type: Date,
    default: new Date(),
  },
})

// modelの作成
const Post = mongoose.model('Post', PostSchema)

module.exports = Post
