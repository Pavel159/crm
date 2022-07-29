import { Button, Modal, Form } from 'react-bootstrap';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewCurrentDeal } from '../../redux/dealSlice';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { addNewContact } from '../../redux/contactSlice';
import { removeLeadById } from '../../redux/leadSlice';

const CreateDealWindow = ({
  show,
  onHide,
  currentName,
  currentPhone,
  currentMesseger,
}) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const leadId = useParams().id;
  const currentContact = useSelector((state) => state.contact.currentContact);
  const [title, setTitle] = useState('');
  const [name, setName] = useState(currentName);
  const [phone, setPhone] = useState(currentPhone);
  const [messeger, setMesseger] = useState(currentMesseger);
  const [info, setInfo] = useState('');
  const [date, setDate] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [expenses, setExpenses] = useState('');
  let income = totalAmount - expenses;
  console.log(leadId);

  const handleAddNewDeal = () => {
    if (location.pathname.includes('lead')) {
      let userId = localStorage.getItem('userId');
      dispatch(addNewContact({ name, phone, messeger, info: '', date, userId }))
        .then((data) => {
          dispatch(
            addNewCurrentDeal({
              title,
              name,
              phone,
              messeger,
              info,
              date,
              totalAmount,
              expenses,
              income,
              userId,
              contactId: data.payload.id,
            })
          );
        })
        .then(() => {
          dispatch(removeLeadById(leadId));
        })
        .then(() => {
          setName('');
          setPhone('');
          setMesseger('');
          setInfo('');
          setDate('');
          onHide();
          navigate('/deals');
        });
    } else {
      let userId = localStorage.getItem('userId');
      let contactId = currentContact.id;
      dispatch(
        addNewCurrentDeal({
          title,
          name,
          phone,
          messeger,
          info,
          date,
          totalAmount,
          expenses,
          income,
          userId,
          contactId,
        })
      ).then((data) => {
        setTitle('');
        setName('');
        setPhone('');
        setMesseger('');
        setInfo('');
        setDate('');
        setTotalAmount('');
        setExpenses('');
        //   setIncome('');
        onHide();
      });
    }
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
          Создать сделку
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
          <Form.Control
            value={totalAmount}
            onChange={(e) => setTotalAmount(e.target.value)}
            className='mt-4'
            placeholder={'Общая сумма'}
          />
          <Form.Control
            value={expenses}
            onChange={(e) => setExpenses(e.target.value)}
            className='mt-4'
            placeholder={'Сумма затрат'}
          />
          {/* <Form.Control
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            className='mt-4'
            placeholder={'Прибыль'}
          /> */}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='outline-danger' onClick={onHide}>
          Закрыть
        </Button>
        <Button onClick={handleAddNewDeal} variant='outline-success'>
          Создать
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateDealWindow;
