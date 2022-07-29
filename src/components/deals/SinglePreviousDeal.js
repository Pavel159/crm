import React from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './SingleDeal.module.css';
import { Button } from 'react-bootstrap';

const SinglePreviousDeal = (props) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate('/deals/previous/' + props.id);
      }}
      className={classes.deal__container}>
      <p>{props.id}</p>
      <p>{props.title}</p>
      <p>{props.name}</p>
      <p>{props.phone}</p>
      <p>{props.messeger}</p>
      <p>{props.info}</p>
      <p>{props.date}</p>
      <p>{props.totalAmount}</p>
      <p>{props.expenses}</p>
      <p>{props.income}</p>
    </div>
  );
};

export default SinglePreviousDeal;
