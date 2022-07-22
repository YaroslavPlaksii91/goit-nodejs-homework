const { basedir } = global;

const { Contact } = require(`${basedir}/models`);

const getAllContacts = async () => {
  return Contact.find();
};

const getContactById = (id) => {
  return Contact.findById(id);
};

const createContact = (body) => {
  return Contact.create(body);
};

const updateContact = (id, body) => {
  return Contact.findByIdAndUpdate(id, body, { new: true });
};

const removeContact = (id) => {
  return Contact.findByIdAndRemove(id);
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  removeContact,
};
