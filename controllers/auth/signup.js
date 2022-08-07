const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const { basedir } = global;

const { joiAuthSchema } = require(`${basedir}/models`);
const { user: service } = require(`${basedir}/services`);
const { createError, sendEmail } = require(`${basedir}/helpers`);

const signup = async (req, res) => {
  const { error } = joiAuthSchema.validate(req.body);
  if (error) {
    throw createError(400, error.message);
  }

  const { email, password } = req.body;
  const user = await service.findUser({ email });

  if (user) {
    throw createError(409, `User with ${email} already exist`);
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();

  const result = await service.createUser({
    ...req.body,
    avatarURL,
    password: hashPassword,
    verificationToken,
  });

  const mail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Verify email</a>`,
  };

  await sendEmail(mail);

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        email: result.email,
        subscription: result.subscription,
      },
    },
  });
};

module.exports = signup;
