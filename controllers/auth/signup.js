const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const { basedir } = global;

const { joiAuthSchema } = require(`${basedir}/models`);
const { user: service } = require(`${basedir}/services`);
const { createError } = require(`${basedir}/helpers`);

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
  const result = await service.createUser({
    ...req.body,
    avatarURL,
    password: hashPassword,
  });

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
