const lodash = require("lodash");

function ownershipAuthMiddleware(
  Model,
  userIdentifierProperty,
  modelIdPropertyPath, // gde se nalazi id model koj ocu da nadjem
  requestSaveInProperty
) {
  return async (req, res, next) => {
    try {
      const {
        user: { _id: userId },
        user,
      } = req;
      const modelId = lodash.get(req, modelIdPropertyPath);
      const findQuery = { _id: modelId, [userIdentifierProperty]: userId };
      const model = Model.findOne(findQuery);

      if (!model) {
        throw new Error("You don't have permission to access this model");
      }

      req[requestSaveInProperty] = model;
      next();
    } catch (e) {
      res.status(401).send({
        error: "Please Authenticate.",
      });
    }
  };
}

module.exports = {
  ownershipAuthMiddleware,
};
