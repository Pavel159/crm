import { Button, Modal, Form } from 'react-bootstrap';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { addNewLead } from '../../redux/leadSlice';
import { useDispatch } from 'react-redux';

const CreateLeadWindow = ({ show, onHide }) => {
  const dispatch = useDispatch();
  const leads = useSelector((state) => state.lead.leads);
  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [messeger, setMesseger] = useState('');
  const [info, setInfo] = useState('');
  const [date, setDate] = useState('');
  const handleAddNewLead = () => {
    let userId = localStorage.getItem('userId');
    dispatch(
      addNewLead({ title, name, phone, messeger, info, date, userId })
    ).then((data) => {
      setTitle('');
      setName('');
      setPhone('');
      setMesseger('');
      setInfo('');
      setDate('');
      onHide();
    });
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
          Добавить нового лида
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='mt-4'
            placeholder={'Название'}
          />
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
        <Button onClick={handleAddNewLead} variant='outline-success'>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateLeadWindow;
