const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
require("dotenv").config();

// load up the user model
const User = require("../models/User");

module.exports = function(passport) {
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
  opts.secretOrKey = process.env.APP_SECRET;
  passport.use(
    new JwtStrategy(opts, function(jwt_payload, done) {
      User.findOne({ id: jwt_payload.id }, function(err, user) {
        if (err) {
          return done(err, false);
        }
        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      });
    })
  );
};
