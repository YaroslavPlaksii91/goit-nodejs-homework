const { basedir } = global;

const { contact: service } = require(`${basedir}/services`);
const { createError } = require(`${basedir}/helpers`);

const remove = async (req, res) => {
  const { id } = req.params;
  const result = await service.removeContact(id);

  if (!result) {
    throw createError(404);
  }

  res.json({
    status: "success",
    code: 200,
    message: "contact deleted",
    data: {
      result,
    },
  });
};

module.exports = remove;
