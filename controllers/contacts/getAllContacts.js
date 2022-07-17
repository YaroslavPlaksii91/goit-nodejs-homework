const contacts = require("../../models/contacts");

const getAllContacts = async (_, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = getAllContacts;
