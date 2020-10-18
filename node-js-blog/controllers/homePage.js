const Post = require('../database/models/Post')

// Post modelからdataを取得したいのでasync awaitで非同期的に処理
module.exports = async (req, res) => {
  // 関連documentをpopulateで取得
  const posts = await Post.find({}).populate('author')
  // console.log(posts)
  // console.log(req.session)
  // renderでtemplateを表示, 第二引数で渡すdataをkey: valueで指定可
  res.render('index', {
    posts,
  })
}