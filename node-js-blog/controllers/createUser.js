module.exports = (req, res) => {
  // console.log(req.session.registrationErrors)
  // templateに渡す変数をkeyとvalueで指定
  res.render('register', {
    errors: req.session.registrationErrors,
  })
}