const mongoose = require('mongoose')

// schemaを定義し、collectionの中のdocumentの構造を明記
const PostSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  content: String, // Stringは、mongoose.Schema.Types.Stringと同値
  // user_idのようにmodel_idのような命名規則はないのでfield名は自由に決めておｋ
  author: {
    // documentのidを示すtype
    type: mongoose.Schema.Types.ObjectId,
    // User modelを参照しているの意
    ref: 'User',
    required: true,
  },
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
