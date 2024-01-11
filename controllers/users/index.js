const { ctrlWrapper } = require("../../helpers");
const registration = require("./authRegistration");
const login = require("./authLogin");
const getCurrent = require("./authCurrent");
const logout = require("./authLogout");
const updateSubscription = require("./updateSubscription");
const updateAvatar = require("./updateAvatar");
const verifyEmail = require("./verifyEmail");

module.exports = {
  registration: ctrlWrapper(registration),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateSubscription: ctrlWrapper(updateSubscription),
  updateAvatar: ctrlWrapper(updateAvatar),
  verifyEmail: ctrlWrapper(verifyEmail),
};
