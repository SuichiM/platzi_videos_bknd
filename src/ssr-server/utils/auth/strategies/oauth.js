const passport = require('passport')
const {OAuth2Strategy} = require('passport-oauth') 
const axios = require('axios')

const boom = require('@hapi/boom')

const {config} = require('../../../config')

const GOOGLE_AUTHORIZATION_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GOOGLE_URSERINFO_URL = 'https://www.googleapis.com/oauth2/v3/userinfo';

/** configuramos el OAuth strategy con google*/
const oAuth2Strategy = new OAuth2Strategy({
  authorizationURL: GOOGLE_AUTHORIZATION_URL,
  tokenURL: GOOGLE_TOKEN_URL,
  clientID: config.googleClientId,
  clientSecret: config.googleClientSecret,
  callbackURL: "/auth/google-oauth/callback"
},
/** la funcion callback de cuando vuelve de google*/
async function(accessToken, refreshToken, profile, cb){
  try {
  const res = await axios({
    url: `${config.apiUrl}/api/auth/sign-provider`,
    method:'post',
    data:{
      name: profile.name,
      email: profile.email,
      password: profile.id,
      apiKeyToken: config.apiKeyToken
    }
  })

  const {data, status} = res
  if(!data || status !== 200)
    return cb(boom.unauthorized(), false)
  
    return cb(null, data)

  } catch (error) {
    cb(error)    
  }

})

oAuth2Strategy.userProfile = function (accessToken, done){
  this._oauth2.get(GOOGLE_URSERINFO_URL, accessToken, (err, body)=>{
    if(err)
      return done(err)
    
    try {
      const parsed = JSON.parse(body)
      console.log(parsed);

      const {sub, name, email} = parsed

      const profile = {
        id:sub,
        name,
        email
      }

      done(null, profile)
    } catch (error) {
      return done(error)
    }
  })
}

passport.use('google-oauth', oAuth2Strategy)