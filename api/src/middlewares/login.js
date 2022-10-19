const { expressjwt: jwt } = require('express-jwt');
const jwks = require('jwks-rsa');

const {AUTH0_AUDIENCE, AUTH0_ISSUER} = process.env

const login = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${AUTH0_ISSUER}.well-known/jwks.json`
  }),
  audience: AUTH0_AUDIENCE,
  issuer: AUTH0_ISSUER,
  algorithms: ['RS256']
});

module.exports = login;