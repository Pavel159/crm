import { Button, Modal, Form } from 'react-bootstrap';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateSelectedDealById } from '../../redux/dealSlice';

const UpdateDealWindow = ({
  show,
  onHide,
  currentTitle,
  currentName,
  currentPhone,
  currentMesseger,
  currentInfo,
  currentDate,
  currentTotalAmount,
  currentExpenses,
}) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [title, setTitle] = useState(currentTitle);
  const [name, setName] = useState(currentName);
  const [phone, setPhone] = useState(currentPhone);
  const [messeger, setMesseger] = useState(currentMesseger);
  const [info, setInfo] = useState(currentInfo);
  const [date, setDate] = useState(currentDate);
  const [totalAmount, setTotalAmount] = useState(currentTotalAmount);
  const [expenses, setExpenses] = useState(currentExpenses);
  const [income, setIncome] = useState(totalAmount - expenses);

  const handleUpdateDeal = () => {
    dispatch(
      updateSelectedDealById({
        id,
        title,
        name,
        phone,
        messeger,
        info,
        date,
        totalAmount,
        expenses,
        income,
      })
    ).then(() => {
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
          Редактирование сделки
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
            placeholder={'Расходы'}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='outline-danger' onClick={onHide}>
          Close
        </Button>
        <Button onClick={handleUpdateDeal} variant='outline-success'>
          Обновить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateDealWindow;
