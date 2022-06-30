import React from 'react';
import classes from './SingleLead.module.css';

const SingleLead = (props) => {
  return (
    <div className={classes.lead__container}>
      <p>{props.title}</p>
      <p>{props.name}</p>
      <p>{props.phone}</p>
      <p>{props.messeger}</p>
      <p>{props.info}</p>
      <p>{props.date}</p>
      <p>Удалить &#9940;</p>
    </div>
  );
};

export default SingleLead;
