const User = require('../database/models/User')

module.exports = (req, res, next) => {
  // sessionで取得したuserをmodelで検索
  User.findById(req.session.userId, (error, user) => {
    // user見つからず or error発生
    if (error || !user) {
      return res.redirect('/')
    }
    next()
  })
  // verify user
  // if user is valid, permit request
  // else redirect
}