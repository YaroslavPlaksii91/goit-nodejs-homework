const { basedir } = global;

const { contact: service } = require(`${basedir}/services`);
const { updateFavoriteSchema } = require(`${basedir}/models`);
const { createError } = require(`${basedir}/helpers`);

const updateStatus = async (req, res) => {
  const { error } = updateFavoriteSchema.validate(req.body);

  if (error) {
    throw createError(400, "missing field favorite");
  }

  const { id } = req.params;
  const result = await service.updateContact(id, req.body);

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

module.exports = updateStatus;
