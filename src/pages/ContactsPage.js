import React from 'react';
import ContactForm from '../components/ContactForm';
import ContactList from '../components/ContactList';
import Filter from '../components/Filter';

const ContactsPage = () => {
  return (
    <div>
      <h1>Your Contacts</h1>
      <ContactForm />
      <Filter />
      <ContactList />
    </div>
  );
};

export default ContactsPage;