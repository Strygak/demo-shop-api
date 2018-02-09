module.exports = {
  port: 3000,
  secret: 'fovmdflsrecdcds',
  dbUrl: 'mongodb://localhost/test',

  'facebookAuth' : {
    'clientID'      : '139690616842157',
    'clientSecret'  : '93998a361b88f41fdf30d098a1fd95de', 
    'callbackURL'   : 'http://localhost:3000/auth/facebook/callback',
    'profileURL'    : 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
    'profileFields' : ['id', 'email', 'name']
  },

  'googleAuth': {
    'clientID'      : '350901502302-ltu5tk32a2v6b4lu21u2fha1p91ngqdu.apps.googleusercontent.com',
    'clientSecret'  : '7rUXdF6-k6v4a5ePiCvSZpHr',
    'callbackURL'   : 'http://localhost:3000/auth/google/oauth2Callback'
  }
}
