import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from '../src/components/ContactForm/ContactForm';
import SearchBox from '../src/components/SearchBox/SearchBox';
import ContactList from '../src/components/ContactList/ContactList';
import styles from './App.module.css';


const defaultContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export default function App() {
  const [contacts, setContacts] = useState(() => {
  try {
    const savedContacts = JSON.parse(localStorage.getItem('contacts'));
    return Array.isArray(savedContacts) && savedContacts.length > 0
      ? savedContacts
      : defaultContacts;
  } catch (error) {
    console.error('Помилка при завантаженні контактів:', error);
    return defaultContacts;
  }
});



  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  console.log('Contacts:', contacts);

  const addContact = (newContact) => {
  const isDuplicate = contacts.some(
    (contact) =>
      contact.name.toLowerCase() === newContact.name.toLowerCase() ||
      contact.number === newContact.number
  );

  if (isDuplicate) {
    alert(`${newContact.name} або цей номер вже є у телефонній книзі.`);
    return;
  }

  setContacts((prev) => [...prev, { ...newContact, id: nanoid() }]);
  };


  const deleteContact = (id) => {
    setContacts((prev) => prev.filter(contact => contact.id !== id));
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

console.log('Filtered Contacts:', filteredContacts);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Phonebook</h1>
      <ContactForm onAdd={addContact} />
      <SearchBox value={filter} onChange={setFilter} />
      <ContactList contacts={filteredContacts} onDelete={deleteContact} />
    </div>
  );
}