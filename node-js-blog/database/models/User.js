const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
})

// mongoose model hook, save時に行う処理をhook
UserSchema.pre('save', function (next) {
  const user = this
  // hash(data, salt, callback(error, encryptedData)), saltとは暗号化の際の強度、大きいと処理に時間がかかる
  bcrypt.hash(user.password, 10, function (error, encrypted) {
    user.password = encrypted
    next()
  })
})

module.exports = mongoose.model('User', UserSchema)