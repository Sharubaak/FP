const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// Google OAuth strategy configuration
passport.use(new GoogleStrategy({
    clientID: "990696096435-fjl41fug0qss4551saqt7mpm7pp4s4n8.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:3000/auth/google/callback",
  },
  function(accessToken, refreshToken, profile, cb) {
    // Here, we can link the Google account to the app's user model.
    // For simplicity, let's just use profile info directly.
    return cb(null, profile);
  }
));

// Serialize and deserialize the user for session management
passport.serializeUser((user, cb) => cb(null, user));
passport.deserializeUser((user, cb) => cb(null, user));

module.exports = passport;
