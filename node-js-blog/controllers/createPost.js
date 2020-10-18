module.exports = (req, res) => {
  // login済
  if (req.session.userId) {
    return res.render('create')
  }
  // 未login
  res.redirect('/auth/login')
}