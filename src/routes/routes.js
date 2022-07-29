import Auth from '../pages/auth/Auth';
import ContactPage from '../pages/contacts/ContactPage';
import Contacts from '../pages/contacts/Contacts';
import DealPage from '../pages/deals/DealPage';
import Deals from '../pages/deals/Deals';
import PreviousDealPage from '../pages/deals/PreviousDealPage';
import LeadPage from '../pages/leads/LeadPage';
import Leads from '../pages/leads/Leads';
import Reports from '../pages/reports/Reports';

export const privateRoutes = [
  { path: '/', element: <Leads />, exact: true },
  { path: '/*', element: <Leads />, exact: true },
  { path: '/leads', element: <Leads />, exact: true },
  { path: '/leads/:id', element: <LeadPage />, exact: true },
  { path: '/contacts', element: <Contacts />, exact: true },
  { path: '/contacts/:id', element: <ContactPage />, exact: true },
  { path: '/deals', element: <Deals />, exact: true },
  { path: '/deals/current/:id', element: <DealPage />, exact: true },
  { path: '/deals/previous/:id', element: <PreviousDealPage />, exact: true },
  { path: '/reports', element: <Reports />, exact: true },
];

export const publicRoutes = [
  { path: '/registration', element: <Auth />, exact: true },
  { path: '/login', element: <Auth />, exact: true },
];
