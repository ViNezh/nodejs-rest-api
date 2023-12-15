const { ctrlWrapper } = require("../../helpers");
const { registration, login } = require("./auth");

module.exports = {
  registration: ctrlWrapper(registration),
  login: ctrlWrapper(login),
};
