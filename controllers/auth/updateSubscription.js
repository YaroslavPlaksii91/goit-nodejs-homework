const { basedir } = global;

const { user: service } = require(`${basedir}/services`);
const { updateSubscriptionSchema } = require(`${basedir}/models`);
const { createError } = require(`${basedir}/helpers`);

const updateSubscription = async (req, res) => {
  const { error } = updateSubscriptionSchema.validate(req.body);

  if (error) {
    throw createError(400, "missing field subscription");
  }

  const { id } = req.user;
  const result = await service.updateUser(id, req.body);

  if (!result) {
    throw createError(404);
  }

  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = updateSubscription;
