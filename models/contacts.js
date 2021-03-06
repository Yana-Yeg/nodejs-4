const { Contacts } = require("../db/contactsModel");

const listContacts = async () => await Contacts.find();

const listPaginationContacts = async ({ skip, limit }) =>
  await Contacts.find().select({ __v: 0 }).skip(skip).limit(limit);

const getContactById = async (contactId) =>
  await Contacts.findOne({ _id: contactId });

const removeContact = async (contactId) =>
  await Contacts.findByIdAndRemove(contactId);

const addContact = async (name, email, phone, favorite) =>
  await Contacts.create({ name, email, phone, favorite });

const updateContact = async (contactId, body) =>
  await Contacts.findByIdAndUpdate({ _id: contactId }, body, { new: true });

const updateStatusContact = async (contactId, body) =>
  await Contacts.findByIdAndUpdate({ _id: contactId }, body, { new: true });

// const listPaginationContacts = async (options) =>
//   await Contacts.paginate({}, options);

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
  listPaginationContacts,
};
