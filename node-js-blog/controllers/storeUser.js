const User = require('../database/models/User')

module.exports = (req, res) => {
  // User modelのfield validationが実行され、errorがあれば格納される
  User.create(req.body, (error, user) => {
    // errorのerrors keyの中にerror内容が格納される
    // console.log(Object.keys(error.errors))
    // console.log(error.errors.username.message)
    if (error) {
      // 全error内容をsessionに保存
      const registrationErrors = Object.keys(error.errors).map(key => error.errors[key].message)
      req.session.registrationErrors = registrationErrors
      // validation errorがある時は再度register画面へredirectする、ここでresをreturnしないと後のres.redirect('/')が実行されてしまいheaderを再度書き換えようとしてerrorになるので注意
      return res.redirect('/auth/register')
    }
    res.redirect('/')
  })
}