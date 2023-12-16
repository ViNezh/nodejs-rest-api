const bcrypt = require("bcrypt");
require("dotenv").config();
const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");

const registration = async (req, res) => {
  const { email, password } = req.body;
  const userEmail = await User.findOne({ email });
  if (userEmail) {
    throw HttpError(409, "Email already in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    name: newUser.name,
    email: newUser.email,
  });
};

module.exports = registration;
