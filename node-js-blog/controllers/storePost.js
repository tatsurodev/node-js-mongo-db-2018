const path = require('path')
const Post = require('../database/models/Post')

module.exports = (req, res) => {
  // req.filesでuploadされたfileにaccess
  const { image } = req.files
  // console.log(image)
  // image.mv(path, callback)で移動、先に保存用のposts folderを作成しておくこと
  image.mv(path.join(__dirname, '..', 'public', 'posts', image.name), error => {
    // body-parserで受け取ったform値をreq.bodyで取得
    Post.create({
      ...req.body,
      // static assetはpublic folderにあるのは分かっているのでpublicをpathに含める必要はなし
      image: `/posts/${image.name}`,
      // 投稿者のuser id格納
      author: req.session.userId,
    }, (error, post) => {
      res.redirect('/')
    })
  })
}