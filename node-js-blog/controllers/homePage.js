const Post = require('../database/models/Post')

// Post modelからdataを取得したいのでasync awaitで非同期的に処理
module.exports = async (req, res) => {
  const posts = await Post.find({})
  // console.log(req.session)
  // renderでtemplateを表示, 第二引数で渡すdataをkey: valueで指定可
  res.render('index', {
    posts,
  })
}