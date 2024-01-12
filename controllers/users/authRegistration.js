const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");
const pug = require("pug");
const path = require("path");
const { convert } = require("html-to-text");

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
  const url = `http://localhost:5000/api/users/verify/${verificationToken}`;

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const html = pug.renderFile(
    path.join(__dirname, "../", "../", "views", "email", "layouts", "main.pug"),
    { name: newUser.name, url }
  );

  const msg = {
    to: email,
    subject: "Email confirmation",
    html,
    text: convert(html),
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
