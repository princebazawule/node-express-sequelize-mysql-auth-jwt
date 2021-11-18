module.exports = {
  secret: process.env.SECRET,
  jwtExpiration: 60,           // 3600, 1 hour
  jwtRefreshExpiration: 120,   // 86400, 24 hours
}
