// validation middlewareの作成
module.exports = (req, res, next) => {
  // console.log(req.files)
  if (!req.files || !req.body.title || !req.body.subtitle || !req.body.content) {
    return res.redirect('/posts/new')
  }
  // nextをcallしないとresponseがhangingになるので注意
  next()
}
