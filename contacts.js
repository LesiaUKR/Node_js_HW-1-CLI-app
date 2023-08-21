const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

/*
 * Розкоментуй і запиши значення
 * const contactsPath = ;
 */

const contactsPath = './db/contacts.json';

// TODO: задокументувати кожну функцію
const listContacts = async () => {
  // ...твій код. Повертає масив контактів.
     const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

const getContactById = async (contactId) => {
  // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
      const contacts = await listContacts();
    const result = contacts.find(item => item.id === contactId);
    return result || null;
}

const removeContact = async (contactId) => {
  // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
    const contacts = await listContacts();

    const index = contacts.findIndex(item => item.id === contactId);
    if (index === -1) {
        return null;
    }
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
    
}

const addContact = async (name, email, phone) => {
    // ...твій код. Повертає об'єкт доданого контакту.
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        ...name,
        ...email,
        ...phone,
    }
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
    
}

const contacts = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};


module.exports = contacts; //експорт за замовчуванням