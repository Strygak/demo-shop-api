const User = require('../models/user');
const passport = require('passport');
const config = require('./index');
const GoogleStrategy = require('passport-google-auth').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
 
passport.use(new GoogleStrategy({
    clientId: config.googleAuth.clientID,
    clientSecret: config.googleAuth.clientSecret,
    callbackURL: config.googleAuth.callbackURL
  }, (accessToken, refreshToken, profile, done) => {
	
    User.findOne({ 'google.id': profile.id }, (err, user) => {
      if (err) {
				return done(err);
			}

			if (user) {
				return done(null, user);
			}
			else {
				var user = new User({
					name: profile.name.givenName,
					email: profile.emails[0].value
				});
				
				user.google.id    = profile.id;
				user.google.token = accessToken;
				user.google.name  = profile.displayName;
				user.google.email = profile.emails[0].value;

				user.save((err) => {
					if (err) {
						throw err;
					}
					return done(null, user);
			  });
			}
    });
  }
));

passport.use(new FacebookStrategy({
  clientID: config.facebookAuth.clientID,
  clientSecret: config.facebookAuth.clientSecret,
  callbackURL: config.facebookAuth.callbackURL
}, (accessToken, refreshToken, profile, done) => {

		User.findOne({ 'facebook.id': profile.id }, (err, user) => {
			if (err) {
				return done(err);
			}

			if (user) {
				return done(null, user); 
			} 
			else {
				let user = new User({
					name: profile.displayName
				});

				user.facebook.id    = profile.id;                
				user.facebook.token = accessToken;                     
				user.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;

				user.save((err) => {
					if (err) {
						throw err;
					}
					return done(null, user);
				});
			}
		});
  }
));

module.exports = passport;