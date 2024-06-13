require('dotenv').config()
const passport =require("passport")
const GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_KEY,
  clientSecret: process.env.GOOGLE_SECRET_KEY,
  callbackURL: `${process.env.FACEBOOK_REDIRECT_URL}auth/google/callback`,
  passReqToCallback: false
},
function(request, accessToken, refreshToken, profile, done) {
  return done(null, profile);
  }
));