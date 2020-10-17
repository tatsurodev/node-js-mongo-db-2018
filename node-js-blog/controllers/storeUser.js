const User = require('../database/models/User')

module.exports = (req, res) => {
  // User modelのfield validationが実行され、errorがあれば格納される
  User.create(req.body, (error, user) => {
    if (error) {
      // validation errorがある時は再度register画面へredirectする、ここでresをreturnしないと後のres.redirect('/')が実行されてしまいheaderを再度書き換えようとしてerrorになるので注意
      return res.redirect('/auth/register')
    }
    res.redirect('/')
  })
}