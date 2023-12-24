const fs = require("fs/promises");
const path = require("path");
const { User } = require("../../models/user");
const { resizeAvatar } = require("../../helpers");
const avatarDir = path.join(__dirname, "../../public/avatars");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  await resizeAvatar(tempUpload);
  const fileName = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarDir, fileName);
  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join("avatars", fileName);
  await User.findByIdAndUpdate(_id, { avatarURL });
  res.status(200).json({ avatarURL });
};

module.exports = updateAvatar;
