const { createError } = require("../../helpers");
const contacts = require("../../models/contacts");

const removeContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.removeContact(id);

    if (!result) {
      throw createError(404);
    }

    res.json({
      message: "contact deleted",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = removeContact;
