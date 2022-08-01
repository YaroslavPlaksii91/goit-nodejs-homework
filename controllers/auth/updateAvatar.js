const path = require("path");
const fs = require("fs/promises");
// const Jimp = require("jimp");

const { basedir } = global;

const { user: service } = require(`${basedir}/services`);

const avatarsDir = path.join(basedir, "public", "avatars");

const updateAvatar = async (req, res) => {
  //   Jimp.read(tempUpload)
  //     .then((img) => {
  //       return img.resize(250, 250).write(resultUpload);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     })
  //     .finally(await fs.unlink(tempUpload));

  try {
    const { _id: id } = req.user;
    const { path: tempPath, originalname } = req.file;
    const [extension] = originalname.split(".").reverse();
    const avatarName = `${id}.${extension}`;
    const uploadPath = path.join(avatarsDir, avatarName);
    const avatarURL = path.join("avatars", avatarName);

    await fs.rename(tempPath, uploadPath);
    await service.updateUser(id, { avatarURL });

    res.json({
      status: "success",
      code: 200,
      data: {
        avatarURL,
      },
    });
  } catch (error) {
    await fs.unlink(req.file.path);
    throw error;
  }
};

module.exports = updateAvatar;
