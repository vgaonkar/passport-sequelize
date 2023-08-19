const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/User');

function initialize(passport) {
  const authenticateUser = async (email, password, done) => {
    try {
      const userData = await User.findOne({ where: { email: email } });
      if (userData == null) {
        return done(null, false, { message: 'Incorrect email or password' });
      }
      const validPassword = await userData.checkPassword(password);
      if (!validPassword) {
        return done(null, false, { message: 'Incorrect email or password' });
      }
      return done(null, userData);
    } catch (err) {
      return done(err);
    }
  };

  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      authenticateUser
    )
  );

  passport.serializeUser((user, done) => {});
  passport.deserializeUser((email, done) => {});
}

module.exports = initialize;
