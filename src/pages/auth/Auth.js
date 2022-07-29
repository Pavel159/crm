import React, { useState } from 'react';
import { Container, Card, Form, Button, Row } from 'react-bootstrap';
import DocumentTitle from 'react-document-title';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { login, registration } from '../../http/userAPI';
import { setAuth, setUser } from '../../redux/userSlice';

const Auth = () => {
  const location = useLocation();
  const isLogin = location.pathname === '/login';

  const user = useSelector((state) => state.user.user);
  const isAuth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const click = async () => {
    try {
      let data;
      if (isLogin) {
        data = await login(email, password);
      } else {
        data = await registration(email, password);
      }
      dispatch(setUser(user));
      dispatch(setAuth(true));
      navigate('/');
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  return (
    <Container
      className='d-flex justify-content-center align-items-center'
      style={{ height: window.innerHeight - 54 }}>
      <DocumentTitle title={isLogin ? 'Авторизация' : 'Регистрация'} />
      <Card className='p-5' style={{ width: 600 }}>
        <h2 className='m-auto'>{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
        <Form className='d-flex flex-column'>
          <Form.Control
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='mt-3'
            placeholder='Введите email'
          />
          <Form.Control
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='mt-3'
            placeholder='Введите пароль'
          />
          <Row className='d-flex justify-content-between mt-3'>
            {isLogin ? (
              <div>
                Нет аккаунта?
                <Link className='m-2' to='/registration'>
                  Регистрация
                </Link>
              </div>
            ) : (
              <div>
                Есть аккаунт?
                <Link className='m-2' to='/login'>
                  Вход
                </Link>
              </div>
            )}
            <Button
              onClick={click}
              className='mt-3 align-self-end'
              variant={'outline-success'}>
              {isLogin ? 'Войти' : 'Регистрация'}
            </Button>
          </Row>
        </Form>
      </Card>
    </Container>
  );
};

export default Auth;
