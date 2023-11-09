import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { Layout } from './Layout';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, changeFilter, deleteContact, selectContacts, selectFilter } from 'redux/contactsSlice';

// зберігання даних в локальному сховищі
// const save = (key, value) => {
//   try {
//     const serializedState = JSON.stringify(value);
//     localStorage.setItem(key, serializedState);
//   } catch (error) {
//     console.error('Set state error: ', error.message);
//   }
// };

// завантаження даних з локального сховища
// const load = key => {
//   try {
//     const serializedState = localStorage.getItem(key);
//     return serializedState === null ? undefined : JSON.parse(serializedState);
//   } catch (error) {
//     console.error('Get state error: ', error.message);
//   }
// };

// початкове заповнення масиву контактів зі сховища
// const initContacts = () => {
//   const phoneContacts = load('phoneContacts');
//   return phoneContacts ? phoneContacts : []
// };

export const App = () => {

  // ініціалізація станів
  // const [filter, setFilter] = useState('');
  // const [contacts, setContacts] = useState(() => initContacts());
  const filter = useSelector(selectFilter);
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  // збереження контактів при зміні кількості
  // useEffect(() => {
  //   save('phoneContacts', contacts)
  // }, [contacts])

  //додавання нового контакту
  const handleSubmit = ({ name, number }) => {
    if (contacts.some(contact => contact.name === name)) {
      alert(`${name} is alredy in contacts.`);
      return false;
    }
    const id = nanoid();
    // setContacts(prevState => [...prevState, { name, number, id }])
    dispatch(addContact({ name, number, id }))
    return true;
  };

  // видалення контакту
  const onDeleteForm = id => {
    // setContacts(prevState => prevState.filter(contact => contact.id !== id))
    dispatch(deleteContact(id))
  };

  //зміна фільтру
  const onChangeFilter = (evt) => {
    // setFilter(evt.target.value);
    dispatch(changeFilter(evt.target.value))
  };

  //фільтрування виводимих контактів
  const filtredContacts = contacts.filter(contact =>
    contact.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))

  return (
    <Layout>
      <h1>Phonebook</h1>
      <ContactForm handleSubmit={handleSubmit} />

      <h2>Contacts</h2>
      <Filter filter={filter} onChangeFilter={onChangeFilter} />
      <ContactList contacts={filtredContacts} onDeleteForm={onDeleteForm} />
    </Layout >
  )
}

