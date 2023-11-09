import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filter: '',
    contacts: [],
}

const contactsSlice = createSlice({
  // Ім'я слайсу
  name: "contacts",
  // Початковий стан редюсера слайсу
  initialState,
  // Об'єкт редюсерів
  reducers: {
    addContact(state, action) {
      state.contacts = [...state.contacts,action.payload]
     },
    deleteContact(state, action) { 
      state.contacts = state.contacts.filter(contact => contact.id !== action.payload)
    },
    changeFilter(state, action) {
      state.filter = action.payload
     },
  },
});

// Генератори екшенів
export const { addContact,deleteContact,changeFilter } = contactsSlice.actions;

//селектори 
export const selectFilter = store => store.contactsStore.filter;
export const selectContacts = store => store.contactsStore.contacts

// Редюсер слайсу
export const contactsReducer = contactsSlice.reducer;