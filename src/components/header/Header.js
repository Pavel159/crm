import React from 'react';
import classes from './Header.module.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className={classes.header}>
      <div className={classes.navbar}>
        <Link className={classes.navbar__item} to='/leads'>
          Лиды
        </Link>
        <Link className={classes.navbar__item} to='/contacts'>
          Контакты
        </Link>
        <Link className={classes.navbar__item} to='/deals'>
          Сделки
        </Link>
        <Link className={classes.navbar__item} to='/reports'>
          Отчеты
        </Link>
      </div>
    </header>
  );
};

export default Header;
