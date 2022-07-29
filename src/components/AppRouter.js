import { Route, Routes } from 'react-router-dom';
import { publicRoutes, privateRoutes } from '../routes/routes';
import { useSelector } from 'react-redux';
import Leads from '../pages/leads/Leads';
import LeadPage from '../pages/leads/LeadPage';
import Contacts from '../pages/contacts/Contacts';
import ContactPage from '../pages/contacts/ContactPage';
import Deals from '../pages/deals/Deals';
import DealPage from '../pages/deals/DealPage';
import PreviousDealPage from '../pages/deals/PreviousDealPage';

export default function AppRouter() {
  const isAuth = useSelector((state) => state.user.isAuth);
  return (
    <Routes>
      {publicRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={route.element}
          exact={route.exact}
        />
      ))}
      {isAuth &&
        privateRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={route.element}
            exact={route.exact}
          />
        ))}

      {isAuth && (
        <Route path='leads' element={<Leads />}>
          <Route path=':id' element={<LeadPage />} />
        </Route>
      )}
      {isAuth && (
        <Route path='contacts' element={<Contacts />}>
          <Route path=':id' element={<ContactPage />} />
        </Route>
      )}
      {isAuth && (
        <Route path='deals' element={<Deals />}>
          <Route path='current/:id' element={<DealPage />} />
          <Route path='previous/:id' element={<PreviousDealPage />} />
        </Route>
      )}
    </Routes>
  );
}
