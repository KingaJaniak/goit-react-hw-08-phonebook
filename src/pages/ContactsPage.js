import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../redux/authSlice';
import ContactForm from '../components/ContactForm';
import ContactList from '../components/ContactList';
import Filter from '../components/Filter';
import { fetchContactsAsync } from '../redux/contactsSlice';

const ContactsPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { contacts, status, error } = useSelector((state) => state.contacts);

  useEffect(() => {
    dispatch(fetchContactsAsync());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div>
      <h2>Hello, {user?.name}! 🎉</h2>
      <button onClick={handleLogout}>Logout</button>

      <h1>Your Contacts</h1>
      <ContactForm />
      <Filter />

      <h3>📞 Contacts list:</h3>
      {status === 'loading' && <p>🔄 Loading...</p>}
      {error && <p style={{ color: 'red' }}>❌ {error}</p>}
      {contacts.length > 0 ? (
        <ContactList />
      ) : (
        <p>📭 No contacts.</p>
      )}
    </div>
  );
};

export default ContactsPage;
