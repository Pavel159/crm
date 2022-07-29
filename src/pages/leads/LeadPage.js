import { Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getLeadById,
  removeLeadById,
  setCurrentLead,
} from '../../redux/leadSlice';
import UpdateLeadWindow from '../../components/modals/UpdateLeadWindow';
import { addNewContact } from '../../redux/contactSlice';
import CreateDealWindow from '../../components/modals/CreateDealWindow';

const LeadPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(setCurrentLead(null));
    dispatch(getLeadById(id));
  }, []);
  const lead = useSelector((state) => state.lead.currentLead);
  console.log(lead);

  const location = useLocation();
  console.log(location.pathname.includes('lead'));

  const handleConvertToContact = () => {
    dispatch(addNewContact(lead))
      .then(dispatch(removeLeadById(id)))
      .then(navigate('/contacts'));
  };

  const [leadModalVisible, setLeadModalVisible] = useState(false);
  const [dealModalVisible, setDealModalVisible] = useState(false);

  return (
    <div>
      {lead && (
        <div>
          <h2>{lead.title}</h2>
          <h3>{lead.name}</h3>
          <p>{lead.phone}</p>
          <p>{lead.messeger}</p>
          <p>{lead.info}</p>
          <p>{lead.date}</p>
          <UpdateLeadWindow
            show={leadModalVisible}
            onHide={() => setLeadModalVisible(false)}
            currentTitle={lead.title}
            currentName={lead.name}
            currentPhone={lead.phone}
            currentMesseger={lead.messeger}
            currentInfo={lead.info}
            currentDate={lead.date}
          />
          <CreateDealWindow
            show={dealModalVisible}
            onHide={() => setDealModalVisible(false)}
            currentName={lead.name}
            currentPhone={lead.phone}
            currentMesseger={lead.messeger}
          />
          <Button
            className='m-3'
            variant='outline-info'
            onClick={() => setLeadModalVisible(true)}>
            Редактировать
          </Button>
          <Button
            className='m-3'
            variant='outline-info'
            onClick={handleConvertToContact}>
            Конвертировать в контакт
          </Button>
          <Button
            className='m-3'
            variant='outline-info'
            onClick={setDealModalVisible}>
            Создать сделку
          </Button>
        </div>
      )}
    </div>
  );
};

export default LeadPage;
