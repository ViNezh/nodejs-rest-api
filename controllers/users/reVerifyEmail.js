const { User } = require("../../models/user");
const pug = require("pug");
const path = require("path");
const { convert } = require("html-to-text");

const { HttpError, sendEmail } = require("../../helpers");

const reVerifyEmail = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw HttpError(400, "Missing required field email");
  }
  const user = await User.findOne({ email });
  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }
  const url = `http://localhost:5000/api/users/verify/${user.verificationToken}`;
  const html = pug.renderFile(
    path.join(__dirname, "../", "../", "views", "email", "layouts", "main.pug"),
    { name: user.name, url }
  );
  const msg = {
    to: email,
    subject: "Email confirmation",
    html,
    text: convert(html),
  };

  await sendEmail(msg);

  res.status(200).json("Verification email sent");
};

module.exports = reVerifyEmail;
