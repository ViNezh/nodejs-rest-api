const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const { User } = require("../../models/user");
const { HttpError, sendEmail } = require("../../helpers");

const registration = async (req, res) => {
  const { email, password } = req.body;

  const userEmail = await User.findOne({ email });
  if (userEmail) {
    throw HttpError(409, "Email already in use");
  }
  const verificationToken = nanoid();
  const avatarURL = gravatar.url(email);
  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const msg = {
    to: email,
    subject: "Email confirmation",
    html: `<a target="_blank" href="http://localhost:5000/api/users/verify/${verificationToken}">Click to confirm your email</a>`,
  };

  await sendEmail(msg);

  res.status(201).json({
    user: {
      name: newUser.name,
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

module.exports = registration;
