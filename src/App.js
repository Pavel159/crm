import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppRouter from './components/AppRouter';
import Header from './components/header/Header';
import { useDispatch, useSelector } from 'react-redux';
import { check } from './http/userAPI';
import { setAuth, setUser } from './redux/userSlice';
import Spinner from 'react-bootstrap/Spinner';

function App() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    check()
      .then((data) => {
        dispatch(setUser(true));
        dispatch(setAuth(true));
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Spinner animation={'grow'} />;
  }
  return (
    <div className='App'>
      <BrowserRouter>
        <Header />
        <AppRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;
