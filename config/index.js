module.exports = {
  port: 3000,
  secret: 'fovmdflsrecdcds',
  dbUrl: 'mongodb://localhost/test',

  'facebookAuth' : {
    'clientID'      : 'id',
    'clientSecret'  : 'secret', 
    'callbackURL'   : 'http://localhost:3000/auth/facebook/callback',
    'profileURL'    : 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
    'profileFields' : ['id', 'email', 'name']
  },

  'googleAuth': {
    'clientID'      : 'id',
    'clientSecret'  : 'secret',
    'callbackURL'   : 'http://localhost:3000/auth/google/oauth2Callback'
  }
}
