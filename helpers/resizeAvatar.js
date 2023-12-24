const Jimp = require("jimp");

const resizeAvatar = async (pathToFile) => {
  await Jimp.read(pathToFile)
    .then((image) => {
      return image.resize(250, 250).write(pathToFile);
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = resizeAvatar;
