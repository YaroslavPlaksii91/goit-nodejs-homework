const { basedir } = global;

const { user: service } = require(`${basedir}/services`);
const { createError, sendEmail } = require(`${basedir}/helpers`);
const { verifyEmailSchema } = require(`${basedir}/models`);

const reVerification = async (req, res) => {
  const { error } = verifyEmailSchema.validate(req.body);

  if (error) {
    throw createError(400, "missing required field email");
  }

  const { email } = req.body;

  const user = await service.findUser({ email });

  if (user.verify) {
    throw createError(400, "Verification has already been passed");
  }

  const mail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${user.verificationToken}">Verify email</a>`,
  };

  await sendEmail(mail);

  res.json({
    message: "Verification email sent",
  });
};

module.exports = reVerification;
