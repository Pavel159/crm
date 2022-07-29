import { Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getContactById, setCurrentContact } from '../../redux/contactSlice';
import UpdateContactWindow from '../../components/modals/UpdateContactWindow';
import CreateDealWindow from '../../components/modals/CreateDealWindow';
import {
  getCurrentDealsByContact,
  getPreviousDealsByContact,
} from '../../redux/dealSlice';
import SingleDeal from '../../components/deals/SingleDeal';
import SinglePreviousDeal from '../../components/deals/SinglePreviousDeal';

const ContactPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  let [currentDealsByContactExist, setCurrentDealsByContactExist] =
    useState(false);
  let [previousDealsByContactExist, setPreviousDealsByContactExist] =
    useState(false);
  useEffect(() => {
    localStorage.setItem('contactId', id);
    dispatch(setCurrentContact(null));
    dispatch(getContactById(id));
    dispatch(getCurrentDealsByContact()).then((data) => {
      if (data.payload.count > 0) {
        setCurrentDealsByContactExist(true);
      }
    });
    dispatch(getPreviousDealsByContact()).then((data) => {
      if (data.payload.count > 0) {
        setPreviousDealsByContactExist(true);
      }
    });
  }, []);
  const contact = useSelector((state) => state.contact.currentContact);
  const currentDeals = useSelector((state) => state.deal.currentDeals);
  const sortedCurrentDeals = currentDeals.slice().sort((a, b) => b.id - a.id);

  const previousDeals = useSelector((state) => state.deal.previousDeals);
  const sortedPreviousDeals = previousDeals.slice().sort((a, b) => b.id - a.id);

  const [contactModalVisible, setContactModalVisible] = useState(false);
  const [dealModalVisible, setDealModalVisible] = useState(false);
  return (
    <div>
      {contact && (
        <div>
          <h3>{contact.name}</h3>
          <p>{contact.phone}</p>
          <p>{contact.messeger}</p>
          <p>{contact.info}</p>
          <p>{contact.date}</p>
          <UpdateContactWindow
            show={contactModalVisible}
            onHide={() => setContactModalVisible(false)}
            currentName={contact.name}
            currentPhone={contact.phone}
            currentMesseger={contact.messeger}
            currentInfo={contact.info}
            currentDate={contact.date}
          />
          <CreateDealWindow
            show={dealModalVisible}
            onHide={() => setDealModalVisible(false)}
            currentName={contact.name}
            currentPhone={contact.phone}
            currentMesseger={contact.messeger}
          />
          <Button
            className='m-3'
            variant='outline-info'
            onClick={() => setContactModalVisible(true)}>
            Редактировать
          </Button>
          <Button
            className='m-3'
            variant='outline-info'
            onClick={setDealModalVisible}>
            Создать сделку
          </Button>
        </div>
      )}
      <div>
        {currentDealsByContactExist ? (
          <h2>Текущие сделки:</h2>
        ) : (
          <h2>Сделок пока нет</h2>
        )}
        {currentDeals &&
          sortedCurrentDeals.map((deal) => (
            <SingleDeal
              key={deal.phone}
              id={deal.id}
              title={deal.title}
              name={deal.name}
              phone={deal.phone}
              messeger={deal.messeger}
              info={deal.info}
              date={deal.date}
              totalAmount={deal.totalAmount}
              expenses={deal.expenses}
              income={deal.income}
            />
          ))}
      </div>
      <div>
        {previousDealsByContactExist ? <h2>Прошлые сделки:</h2> : <h2></h2>}
        {previousDeals &&
          sortedPreviousDeals.map((deal) => (
            <SinglePreviousDeal
              key={deal.phone}
              id={deal.id}
              title={deal.title}
              name={deal.name}
              phone={deal.phone}
              messeger={deal.messeger}
              info={deal.info}
              date={deal.date}
              totalAmount={deal.totalAmount}
              expenses={deal.expenses}
              income={deal.income}
            />
          ))}
      </div>
    </div>
  );
};

export default ContactPage;
