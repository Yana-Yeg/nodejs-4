const { Contacts } = require("../db/contactsModel");

const listContacts = async () => {
  try {
    const contactsAll = await Contacts.find();
    return contactsAll;
  } catch (error) {
    console.error(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contactById = await Contacts.findOne({ _id: contactId });
    // const contactById = await Contacts.findById({ _id: contactId });
    return contactById;
  } catch (error) {
    console.error(error.message);
  }
};

const addContact = async (name, email, phone, favorite) => {
  try {
    const newContact = await Contacts.create({ name, email, phone, favorite });
    return newContact;
    // == the same ==
    // const contacts = new Contacts({ name, email, phone });
    // await contacts.save();
    // return newContact;
  } catch (error) {
    console.error(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    await Contacts.findByIdAndRemove({ _id: contactId });
  } catch (error) {
    console.error(error.message);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contactById = await Contacts.findByIdAndUpdate(
      { _id: contactId },
      body,
      { new: true }
    );
    return contactById;
  } catch (error) {
    console.error(error.message);
  }
};

const updateStatusContact = async (contactId, body) => {
  try {
    const updateContactItem = Contacts.findByIdAndUpdate(
      { _id: contactId },
      body,
      { new: true }
    );
    return updateContactItem;
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
