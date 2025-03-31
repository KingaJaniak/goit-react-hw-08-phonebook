import axios from 'axios';


const API_URL = 'https://connections-api.goit.global';


export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, { email, password });
    return response.data;  
  } catch (error) {
    console.error('Error logging in:', error);
    throw error; 
  }
};


export const registerUser = async (name, email, password) => {
  try {
    console.log("Dane wysyłane do API:", { name, email, password });

    const response = await axios.post('https://connections-api.goit.global/users/signup', {
      name,
      email,
      password,
    });

    console.log("Odpowiedź z API:", response.data);
    return response.data;
  } catch (error) {
    console.error("Błąd podczas rejestracji użytkownika:", error.response?.data || error.message);
    throw error;
  }
};






export const fetchCurrentUser = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/users/current`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;  
  } catch (error) {
    console.error('Error fetching current user:', error);
    throw error;
  }
};


export const fetchContacts = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/contacts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;  
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw error;
  }
};

export const addContact = async (contact, token) => {
  try {
    const response = await axios.post(`${API_URL}/contacts`, contact, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;  
  } catch (error) {
    console.error('Error adding contact:', error);
    throw error;
  }
};


export const removeContact = async (contactId, token) => {
  try {
    const response = await axios.delete(`${API_URL}/contacts/${contactId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;  
  } catch (error) {
    console.error('Error removing contact:', error);
    throw error;
  }
};

export const updateContact = async (contactId, updatedContact, token) => {
  try {
    const response = await axios.patch(`${API_URL}/contacts/${contactId}`, updatedContact, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;  
  } catch (error) {
    console.error('Error updating contact:', error);
    throw error;
  }
};