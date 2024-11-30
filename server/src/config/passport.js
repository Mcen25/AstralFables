// backend/config/passport.js
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const MicrosoftStrategy = require("passport-microsoft").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const DiscordStrategy = require("passport-discord").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // Handle user data
      done(null, profile);
    }
  )
);

// Add similar configurations for Microsoft, GitHub and Discord

module.exports = passport;
