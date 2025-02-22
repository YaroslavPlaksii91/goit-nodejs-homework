const { basedir } = global;

const { contact: service } = require(`${basedir}/services`);
const { createError } = require(`${basedir}/helpers`);

const getById = async (req, res) => {
  const { id } = req.params;
  const contact = await service.getContactById(id);

  if (!contact) {
    throw createError(404);
  }

  res.json({
    status: "success",
    code: 200,
    data: {
      contact,
    },
  });
};

module.exports = getById;
