const passport = require('passport')
const LocalStrategy = require('passport-local')
const bcrypt = require('bcrypt-nodejs');
const User = require('../models/user')

passport.use(new LocalStrategy({
    passReqToCallback: true,
  },
  function(req, username, password, cb) {
    User.findOne({ username: username }, function(err, user) {
      if (err) return cb(err)
      if (!user) return cb(null, false, req.flash('error_messages', 'You are not logged in'))
      if (!bcrypt.compareSync(password, user.password)) return cb(null, false, req.flash('error_messages', 'You are not logged in'))
      return cb(null, user)
    })
  }
))

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  User.findById(id, function (err, user) {
    if (err) return cb(err)
    cb(null, user)
  })
})

module.exports = passport
