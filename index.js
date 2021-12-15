// const yargs = require('yargs');
// const { hideBin } = require('yargs/helpers');
const { program } = require('commander');

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

const contactsOperations = require('./contacts');

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
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

// CLI с помощью пакета yargs
// const arr = hideBin(process.argv);
// const { argv } = yargs(arr);
// console.log(argv);

// CLI с помощью пакета commander
program.parse(process.argv);
const argv = program.opts();

// Вызов функции с переданными опциями
invokeAction(argv);
