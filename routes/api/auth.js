const express = require("express");

const ctrl = require("../../controllers/users");

const {
  validateBody,
  authenticate,
  uploadAvatar,
} = require("../../middlewares");

const { schemas } = require("../../models/user");

const router = express.Router();

router.post(
  "/users/register",
  validateBody(schemas.registerSchema),
  ctrl.registration
);
router.post("/users/login", validateBody(schemas.loginSchema), ctrl.login);

router.get("/users/current", authenticate, ctrl.getCurrent);

router.post("/users/logout", authenticate, ctrl.logout);

router.patch("/users/subscription", authenticate, ctrl.updateSubscription);

router.patch(
  "/users/avatars",
  authenticate,
  uploadAvatar.single("avatar"),
  ctrl.updateAvatar
);

router.get("/users/verify/:verificationToken", ctrl.verifyEmail);

module.exports = router;
