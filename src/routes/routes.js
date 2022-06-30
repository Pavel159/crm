import Contacts from '../pages/contacts/Contacts';
import Deals from '../pages/deals/Deals';
import Leads from '../pages/leads/Leads';
import Reports from '../pages/reports/Reports';

export const routes = [
  { path: '/', element: <Leads />, exact: true },
  { path: '/leads', element: <Leads />, exact: true },
  { path: '/contacts', element: <Contacts />, exact: true },
  { path: '/deals', element: <Deals />, exact: true },
  { path: '/reports', element: <Reports />, exact: true },
];
