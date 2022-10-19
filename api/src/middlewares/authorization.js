const jwtAuthz = require('express-jwt-authz');

const authorization = jwtAuthz(["post:products"],{
  customScopeKey: "permissions",
  customUserKey: 'auth'
});

module.exports = authorization;