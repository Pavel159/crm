import React from 'react';
import classes from './SingleLead.module.css';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { fetchLeads, removeLead } from '../../http/leadAPI';
import { useSelector, useDispatch } from 'react-redux';
import { removeLeadById, removeLeadFromStore } from '../../redux/leadSlice';

const SingleLead = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRemoveLead = (e) => {
    e.stopPropagation();
    const id = props.id;
    dispatch(removeLeadById(id));
  };

  return (
    <div
      onClick={() => {
        navigate('/leads/' + props.id);
      }}
      className={classes.lead__container}>
      <p>{props.id}</p>
      <p>{props.title}</p>
      <p>{props.name}</p>
      <p>{props.phone}</p>
      <p>{props.messeger}</p>
      <p>{props.info}</p>
      <p>{props.date}</p>
      <Button
        onClick={handleRemoveLead}
        data-id={props.id}
        variant='outline-danger'>
        Удалить
      </Button>
    </div>
  );
};

export default SingleLead;

{
  /* <div
onClick={() => {
  navigate('/leads/' + props.id);
}}
className={classes.lead__container}>
<p>{props.id}</p>
<p>{props.title}</p>
<p>{props.name}</p>
<p>{props.phone}</p>
<p>{props.messeger}</p>
<p>{props.info}</p>
<p>{props.date}</p>
<Button
  data-id={props.id}
  onClick={handleRemoveLead}
  variant='outline-danger'>
  Удалить
</Button>
</div> */
}
