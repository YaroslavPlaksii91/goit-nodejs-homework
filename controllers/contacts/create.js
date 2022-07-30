const { basedir } = global;

const { contact: service } = require(`${basedir}/services`);
const { addSchema } = require(`${basedir}/models`);
const { createError } = require(`${basedir}/helpers`);

const create = async (req, res) => {
  const { error } = addSchema.validate(req.body);

  if (error) {
    throw createError(400, "missing required name field");
  }

  const { id: owner } = req.user;
  const result = await service.createContact({ ...req.body, owner });
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result,
    },
  });
};

module.exports = create;
