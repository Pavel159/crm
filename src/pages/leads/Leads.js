import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import DocumentTitle from 'react-document-title';
import { useDispatch, useSelector } from 'react-redux';
import SingleLead from '../../components/leads/SingleLead';
import CreateLeadWindow from '../../components/modals/CreateLeadWindow';
import CreateLead from '../../components/modals/CreateLeadWindow';
import Pages from '../../components/Pages';
import PrimaryButton from '../../components/UI/buttons/PrimaryButton';
import { fetchLeads } from '../../http/leadAPI';
import { getLeads } from '../../redux/leadSlice';
import {
  addLead,
  fetchLeadsToStore,
  setPage,
  setTotalCount,
} from '../../redux/leadSlice';

const Leads = () => {
  const dispatch = useDispatch();

  const [leadModalVisible, setLeadModalVisible] = useState(false);
  useEffect(() => {
    dispatch(getLeads());
  }, []);
  const leads = useSelector((state) => state.lead.leads);
  // console.log(leads);
  // console.log(leads.forEach((lead) => console.log(lead['id'])));
  const sortedLeads = leads.slice().sort((a, b) => b.id - a.id);

  return (
    <div>
      <DocumentTitle title='Лиды' />
      <h1 style={{ textAlign: 'center' }}>Лиды</h1>
      <Button
        className='m-3'
        variant='outline-success'
        onClick={() => setLeadModalVisible(true)}>
        Добавить лида
      </Button>
      <CreateLeadWindow
        show={leadModalVisible}
        onHide={() => setLeadModalVisible(false)}
      />
      {leads &&
        sortedLeads.map((lead) => (
          <SingleLead
            key={lead.title}
            id={lead.id}
            title={lead.title}
            name={lead.name}
            phone={lead.phone}
            messeger={lead.messeger}
            info={lead.info}
            date={lead.date}
          />
        ))}
    </div>
  );
};

export default Leads;
