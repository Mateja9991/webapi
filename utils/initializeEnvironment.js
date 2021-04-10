const path = require("path");
const dotenv = require("dotenv");

function initEnvironment() {
  dotenv.config({ path: path.resolve("env.local") });
}

module.exports = {
  initEnvironment,
};
