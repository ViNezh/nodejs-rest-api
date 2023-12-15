const express = require("express");

const ctrl = require("../../controllers/users");

const { validateBody } = require("../../middlewares");

const { schemas } = require("../../models/user");

const router = express.Router();

router.post(
  "/registration",
  validateBody(schemas.registerSchema),
  ctrl.registration
);
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

module.exports = router;
