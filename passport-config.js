const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/User');


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

function initialize(passport) {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      authenticateUser
    )
  );

  passport.serializeUser((user, done) => {
    return done(null, user.email)
  });

  passport.deserializeUser(async (email, done) => {
    const userData = await User.findOne({ where: { email: email }});
    return done(null, userData)
  });
}

module.exports = initialize;
