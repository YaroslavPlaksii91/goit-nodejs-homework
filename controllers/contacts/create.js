const { basedir } = global;

const service = require(`${basedir}/services/contact`);
const { addSchema } = require(`${basedir}/models`);
const { createError } = require(`${basedir}/helpers`);

const create = async (req, res) => {
  const { error } = addSchema.validate(req.body);

  if (error) {
    throw createError(400, "missing required name field");
  }

  const result = await service.createContact(req.body);
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result,
    },
  });
};

module.exports = create;
