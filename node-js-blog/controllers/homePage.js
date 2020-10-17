const Post = require('../database/models/Post')

module.exports = async (req, res) => {
  const posts = await Post.find({})
  // renderでtemplateを表示, 第二引数で渡すdataをkey: valueで指定可
  res.render('index', {
    posts,
  })
}