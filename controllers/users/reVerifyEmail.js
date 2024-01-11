const { User } = require("../../models/user");

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
  const msg = {
    to: email,
    subject: "Email confirmation",
    html: `<a target="_blank" href="http://localhost:5000/api/users/verify/${verificationToken}">Click to confirm your email</a>`,
  };

  await sendEmail(msg);

  res.status(200).json("Verification email sent");
};

module.exports = reVerifyEmail;
