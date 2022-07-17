const { createError } = require("../../helpers");
const contacts = require("../../models/contacts");
const { addSchema } = require("../../schemas/contacts");

const updateContact = async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);

    if (error) {
      throw createError(400, "missing fields");
    }

    const { id } = req.params;
    const result = await contacts.updateContact(id, req.body);

    if (!result) {
      throw createError(404);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = updateContact;
