import React, {useState} from 'react';
import { FormEl, LabelFormEl, InputFormEl } from './Form.styled';
import { useSelector, useDispatch } from 'react-redux';
import { addContacts } from 'redux/operations';
import { getContacts } from 'redux/contactSlice';

function Form() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  const formSubmitHandler = data => {
    if (contacts.filter(contact => contact.name === data.name).length > 0) {
      alert(`${data.name}  is already in contacts`);
      return;
    }
    dispatch(addContacts(data));
  };

  const handleChange = event => {
    const { name, value } = event.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        console.warn('There is no such');
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    formSubmitHandler({ name, number });
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setNumber('');
  };

  return (
    <FormEl onSubmit={handleSubmit}>
      <LabelFormEl>
        Name
        <InputFormEl
          onChange={handleChange}
          value={name}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </LabelFormEl>
      <LabelFormEl>
        Number
        <InputFormEl
          onChange={handleChange}
          value={number}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </LabelFormEl>

      <button type="submit">Add contact</button>
    </FormEl>
  );
}


export default Form;
