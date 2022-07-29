import React from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './SingleContact.module.css';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { removeContactById } from '../../redux/contactSlice';

const SingleContact = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRemoveContact = (e) => {
    e.stopPropagation();
    const id = props.id;
    dispatch(removeContactById(id));
  };

  return (
    <div
      onClick={() => {
        navigate('/contacts/' + props.id);
      }}
      className={classes.contact__container}>
      <p>{props.id}</p>
      <p>{props.name}</p>
      <p>{props.phone}</p>
      <p>{props.messeger}</p>
      <p>{props.info}</p>
      <p>{props.date}</p>
      <Button
        onClick={handleRemoveContact}
        data-id={props.id}
        variant='outline-danger'>
        Удалить
      </Button>
    </div>
  );
};

export default SingleContact;
