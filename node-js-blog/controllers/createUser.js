module.exports = (req, res) => {
  // console.log(req.session.registrationErrors)
  // console.log('flash', req.flash('data'))
  // templateに渡す変数をkeyとvalueで指定
  res.render('register', {
    // flashから値を取得
    errors: req.flash('registrationErrors'),
    data: req.flash('data')[0],
  })
}