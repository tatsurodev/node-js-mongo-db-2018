module.exports = (req, res, next) => {
  // login済ならhomeへredirect
  if (req.session.userId) {
    return res.redirect('/')
  }
  next()
}