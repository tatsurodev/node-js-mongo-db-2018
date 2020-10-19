const path = require('path')
const cloudinary = require('cloudinary')
const Post = require('../database/models/Post')

module.exports = (req, res) => {
  // req.filesでuploadされたfileにaccess
  const { image } = req.files
  // console.log(image)
  const uploadPath = path.join(__dirname, '..', 'public', 'posts', image.name)
  // image.mv(path, callback)で移動、先に保存用のposts folderを作成しておくこと
  image.mv(uploadPath, error => {
    // cloudinaryでupload error時homeへredirect
    cloudinary.v2.uploader.upload(uploadPath, (error, result) => {
      if (error) {
        return res.redirect('/')
      }
      // cloudinary upload成功時、Post modelにsave
      // body-parserで受け取ったform値をreq.bodyで取得
      Post.create({
        ...req.body,
        image: result.secure_url,
        // 投稿者のuser id格納
        author: req.session.userId,
      }, (error, post) => {
        console.log(post)
        res.redirect('/')
      })
    })

  })
}