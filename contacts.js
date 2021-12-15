const fs = require('fs').promises;
const path = require('path');
const { v4 } = require('uuid');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (err) {
    console.error(err);
  }
}

async function getContactById(contactId) {
  try {
    const list = await listContacts();
    const contactById = list.find(cont => cont.id === contactId);
    if (!contactById) {
      return null;
    }
    return contactById;
  } catch (err) {
    console.error(err);
  }
}

async function updateContact({ id, name, email, phone }) {
  try {
    const list = await listContacts();
    const idx = list.findIndex(item => item.id === id);
    if (idx === -1) {
      return null;
    }
    list[idx] = { id, name, email, phone };

    await fs.writeFile(contactsPath, JSON.stringify(list, null, 2));
    return list[idx];
  } catch (err) {
    console.error(err);
  }
}

async function removeContact(contactId) {
  try {
    const list = await listContacts();
    const idx = list.findIndex(item => item.id === contactId);
    if (idx === -1) {
      return null;
    }

    // const newList = list.filter(el => !(el.id === contactId));
    // await fs.writeFile(contactsPath, JSON.stringify(newList, null, 2));
    // return list[idx];
    const removedContact = list.splice(idx, 1);
    await fs.writeFile(contactsPath, JSON.stringify(list, null, 2));

    return removedContact;
  } catch (err) {
    console.error(err);
  }
}

async function addContact(data) {
  try {
    const list = await listContacts();
    const newContact = { ...data, id: v4() };
    list.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(list, null, 2));
    return newContact;
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  listContacts,
  getContactById,
  updateContact,
  removeContact,
  addContact,
};
