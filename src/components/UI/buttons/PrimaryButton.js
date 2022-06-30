import React from 'react';
import classes from './PrimaryButton.module.css';

const PrimaryButton = ({ children, ...props }) => {
  return (
    <button className={classes.primary__btn} {...props}>
      {children}
    </button>
  );
};

export default PrimaryButton;
