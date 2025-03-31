import { createSelector } from 'reselect';

const selectAllContacts = state => state.contacts.items;

const selectFilter = state => state.filter;

export const selectFilteredContacts = createSelector(
  [selectAllContacts, selectFilter],
  (contacts, filter) => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }
);