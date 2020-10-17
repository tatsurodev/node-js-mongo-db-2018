const bcrypt = require('bcrypt')
const User = require('../database/models/User')

module.exports = (req, res) => {
  const { email, password } = req.body
  // try to find
  User.findOne({
    email,
  }, (error, user) => {
    if (user) {
      // formのpasswordとUser modelに保存されているpasswordが一緒かcheck, callbackの第二引数sameは一致したかどうかのbooleanが格納
      bcrypt.compare(password, user.password, (error, same) => {
        // passwordが一致
        if (same) {
          // sessionを保存
          res.redirect('/')
          // password不一致
        } else {
          res.redirect('/auth/login')
        }
      })
    } else {
      return res.redirect('/auth/login')
    }
  })
}