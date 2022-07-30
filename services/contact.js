const { basedir } = global;

const { Contact } = require(`${basedir}/models`);

const getAllContacts = (query, settings, pagination) =>
  Contact.find(query, settings, pagination).populate(
    "owner",
    "email subscription"
  );

const getContactById = (id) => Contact.findById(id);

const createContact = (body) => Contact.create(body);

const updateContact = (id, body) =>
  Contact.findByIdAndUpdate(id, body, { new: true });

const removeContact = (id) => Contact.findByIdAndRemove(id);

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  removeContact,
};
