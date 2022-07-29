import React, { useEffect, useState } from 'react';
import DocumentTitle from 'react-document-title';
import { useDispatch, useSelector } from 'react-redux';
import { getPreviousDealsByUser } from '../../redux/reportSlice';
import Form from 'react-bootstrap/Form';
import { getContacts } from '../../redux/contactSlice';
import { getPreviousDealsForReport } from '../../redux/reportSlice';

const Reports = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPreviousDealsByUser());
    dispatch(getContacts());
  }, []);

  const previousDeals = useSelector((state) => state.report.previousDeals);
  const contacts = useSelector((state) => state.contact.contacts);

  let totalAmount = 0;
  let totalExpenses = 0;
  let totalIncome = 0;
  for (let deals of previousDeals) {
    for (let deal of deals) {
      totalAmount += deal.totalAmount;
      totalExpenses += deal.expenses;
      totalIncome += deal.income;
    }
  }

  const [contactId, setContactId] = useState(null);

  const previousDealsByContact = useSelector(
    (state) => state.report.previousDealsByContact
  );

  let totalAmountByContact = 0;
  let totalExpensesByContact = 0;
  let totalIncomeByContact = 0;

  for (let deals of previousDealsByContact) {
    for (let deal of deals) {
      totalAmountByContact += deal.totalAmount;
      totalExpensesByContact += deal.expenses;
      totalIncomeByContact += deal.income;
    }
  }

  console.log(totalAmountByContact);
  console.log(contactId);

  const handleSelect = (e) => {
    const idx = e.target.selectedIndex;
    const option = e.target.querySelectorAll('option')[idx];
    const contactId = option.getAttribute('data-contactid');
    setContactId(option.getAttribute('data-contactid'));

    dispatch(getPreviousDealsForReport(contactId));
    return contactId;
  };

  return (
    <div>
      <DocumentTitle title='Отчеты' />
      <div>
        <h2 className='mx-auto'>Общая статистика</h2>
        <h3>Общая сумма сделок: {totalAmount}</h3>
        <h3>Общие расходы: {totalExpenses}</h3>
        <h3>Чистый доход: {totalIncome}</h3>
      </div>

      <div>
        <h2>Статистика по контакту</h2>
        <Form.Select
          onChange={handleSelect}
          aria-label='Default select example'
          style={{ width: '30%' }}
          defaultValue={'default'}>
          <option value={'default'} disabled>
            Выберите контакт
          </option>
          {contacts &&
            contacts.map((contact) => (
              <option
                data-contactid={contact.id}
                key={contact.id}
                value={contact.name}>
                {contact.name}
              </option>
            ))}
        </Form.Select>
        {contactId && (
          <div>
            <h3>Общая сумма сделок: {totalAmountByContact}</h3>
            <h3>Общие расходы: {totalExpensesByContact}</h3>
            <h3>Чистый доход: {totalIncomeByContact}</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;
