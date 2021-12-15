const contactsOperations = require('./contacts');

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      console.log(action);
      const contacts = await contactsOperations.listContacts();
      console.table(contacts);
      break;

    case 'get':
      const contact = await contactsOperations.getContactById(id);
      console.table(contact);
      break;

    case 'add':
      const newContact = await contactsOperations.addContact({
        name,
        email,
        phone,
      });
      console.table(newContact);
      break;

    case 'update':
      const updContact = await contactsOperations.updateContact({
        id,
        name,
        email,
        phone,
      });
      console.table(updContact);
      break;

    case 'remove':
      const removedContact = await contactsOperations.removeContact(id);
      console.table(removedContact);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}
invokeAction({
  action: 'remove',
  id: '1',
  //   name: 'Vasia POPOPO',
  //   email: 'cvetochek@gmail.com',
  //   phone: '0990111232',
});
