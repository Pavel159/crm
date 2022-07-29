import { Button, Modal, Form } from 'react-bootstrap';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewContact } from '../../redux/contactSlice';

const CreateContactWindow = ({ show, onHide }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [messeger, setMesseger] = useState('');
  const [info, setInfo] = useState('');
  const [date, setDate] = useState('');
  const handleAddNewContact = () => {
    let userId = localStorage.getItem('userId');
    dispatch(addNewContact({ name, phone, messeger, info, date, userId })).then(
      (data) => {
        setName('');
        setPhone('');
        setMesseger('');
        setInfo('');
        setDate('');
        onHide();
      }
    );
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          Добавить новый контакт
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='mt-4'
            placeholder={'Имя'}
          />
          <Form.Control
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className='mt-4'
            placeholder={'Телефон'}
          />
          <Form.Control
            value={messeger}
            onChange={(e) => setMesseger(e.target.value)}
            className='mt-4'
            placeholder={'Месседжер'}
          />
          <Form.Control
            value={info}
            onChange={(e) => setInfo(e.target.value)}
            className='mt-4'
            placeholder={'Инфо'}
          />
          <Form.Control
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className='mt-4'
            placeholder={'Дата'}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='outline-danger' onClick={onHide}>
          Close
        </Button>
        <Button onClick={handleAddNewContact} variant='outline-success'>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateContactWindow;
