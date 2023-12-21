const { ctrlWrapper } = require("../../helpers");
const registration = require("./authRegistration");
const login = require("./authLogin");
const getCurrent = require("./authCurrent");
const logout = require("./authLogout");
const updateSubscription = require("./updateSubscription");

module.exports = {
  registration: ctrlWrapper(registration),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateSubscription: ctrlWrapper(updateSubscription),
};
