import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import DocumentTitle from 'react-document-title';
import { useDispatch, useSelector } from 'react-redux';
import SingleContact from '../../components/contacts/SingleContact';
import CreateContactWindow from '../../components/modals/CreateContactWindow';
import { getContacts } from '../../redux/contactSlice';

const Contacts = () => {
  const dispatch = useDispatch();

  const [contactModalVisible, setContactModalVisible] = useState(false);
  useEffect(() => {
    dispatch(getContacts());
  }, []);
  const contacts = useSelector((state) => state.contact.contacts);
  const sortedContacts = contacts.slice().sort((a, b) => b.id - a.id);

  return (
    <div>
      <DocumentTitle title='Контакты' />
      <h1 style={{ textAlign: 'center' }}>Контакты</h1>
      <Button
        className='m-3'
        variant='outline-success'
        onClick={() => setContactModalVisible(true)}>
        Добавить контакт
      </Button>
      <CreateContactWindow
        show={contactModalVisible}
        onHide={() => setContactModalVisible(false)}
      />
      {contacts &&
        sortedContacts.map((contact) => (
          <SingleContact
            key={contact.phone}
            id={contact.id}
            name={contact.name}
            phone={contact.phone}
            messeger={contact.messeger}
            info={contact.info}
            date={contact.date}
          />
        ))}
    </div>
  );
};

export default Contacts;
