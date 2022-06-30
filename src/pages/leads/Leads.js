import React from 'react';
import DocumentTitle from 'react-document-title';
import { useDispatch, useSelector } from 'react-redux';
import SingleLead from '../../components/leads/SingleLead';
import PrimaryButton from '../../components/UI/buttons/PrimaryButton';

const Leads = () => {
  const dispatch = useDispatch();
  const leads = useSelector((state) => state.leads.leads);
  return (
    <div>
      <DocumentTitle title='Лиды' />
      <h1 style={{ textAlign: 'center' }}>Лиды</h1>
      <PrimaryButton>Добавить лида</PrimaryButton>
      {leads &&
        leads.map((lead) => (
          <SingleLead
            key={lead.name}
            title={lead.title}
            name={lead.name}
            phone={lead.contacts.phone}
            messeger={lead.contacts.messeger}
            info={lead.info}
            date={lead.date}
          />
        ))}
    </div>
  );
};

export default Leads;
