import { Button, Modal, Form } from 'react-bootstrap';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateContactById } from '../../redux/contactSlice';

const UpdateContactWindow = ({
  show,
  onHide,
  currentName,
  currentPhone,
  currentMesseger,
  currentInfo,
  currentDate,
}) => {
  const dispatch = useDispatch();
  const currentContact = useSelector((state) => state.contact.currentContact);
  const { id } = useParams();
  const [name, setName] = useState(currentName);
  const [phone, setPhone] = useState(currentPhone);
  const [messeger, setMesseger] = useState(currentMesseger);
  const [info, setInfo] = useState(currentInfo);
  const [date, setDate] = useState(currentDate);
  const handleUpdateContact = () => {
    dispatch(updateContactById({ id, name, phone, messeger, info, date })).then(
      () => {
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
          Редактирование контакта
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
        <Button onClick={handleUpdateContact} variant='outline-success'>
          Обновить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateContactWindow;
