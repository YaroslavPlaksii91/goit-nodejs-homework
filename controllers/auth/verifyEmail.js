const { basedir } = global;

const { user: service } = require(`${basedir}/services`);
const { createError } = require(`${basedir}/helpers`);

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await service.findUser({ verificationToken });
  if (!user) {
    throw createError(404, "User not found");
  }
  await service.updateUser(user._id, {
    verify: true,
    verificationToken: null,
  });

  res.json({
    message: "Verification successful",
  });
};

module.exports = verifyEmail;
