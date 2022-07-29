import React from 'react';
import classes from './Header.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAuth, setUser } from '../../redux/userSlice';
import Button from 'react-bootstrap/Button';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';

const Header = () => {
  const isAuth = useSelector((state) => state.user.isAuth);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(setUser({}));
    dispatch(setAuth(false));
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  };
  const navigate = useNavigate();
  console.log(user);
  return (
    <header>
      <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
        <Navbar.Brand className='ms-3' href='#home'>
          Best CRM
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='m-auto'>
            <Link className='text-decoration-none text-light ms-3' to='/leads'>
              Лиды
            </Link>
            <Link
              className='text-decoration-none text-light ms-3'
              to='/contacts'>
              Контакты
            </Link>
            <Link className='text-decoration-none text-light ms-3' to='/deals'>
              Сделки
            </Link>
            <Link
              className='text-decoration-none text-light ms-3'
              to='/reports'>
              Отчеты
            </Link>
          </Nav>
          <Nav>
            {isAuth ? (
              <Button
                className='me-3'
                variant='outline-danger'
                onClick={logout}>
                Выход
              </Button>
            ) : (
              <Button
                className='me-3'
                variant='outline-success'
                onClick={() => navigate('/login')}>
                Авторизация
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* <div className={classes.navbar}>
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
        {isAuth ? (
          <Button onClick={logout} className={classes.navbar__item}>
            Выход
          </Button>
        ) : (
          <Button
            className={classes.navbar__item}
            onClick={() => navigate('/login')}>
            Авторизация
          </Button>
        )}
      </div> */}
    </header>
  );
};

export default Header;
