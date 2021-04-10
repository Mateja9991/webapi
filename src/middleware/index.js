const { jwtAuthMiddleware } = require("./jwt_authorization_middleware");
const { ownershipAuthMiddleware } = require("./ownership_auth_middleware");

module.exports = {
  jwtAuthMiddleware,
  ownershipAuthMiddleware,
};
