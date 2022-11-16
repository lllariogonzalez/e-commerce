const jwtAuthz = require('express-jwt-authz');

const admin = jwtAuthz(["admin:user"],{
  customScopeKey: "permissions",
  customUserKey: 'auth'
});

module.exports = admin;