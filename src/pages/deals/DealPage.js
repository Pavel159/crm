import { Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  addNewPreviousDeal,
  getCurrentDealById,
  removeCurrentDealById,
  setSelectedDeal,
} from '../../redux/dealSlice';
import UpdateDealWindow from '../../components/modals/updateDealWindow';
import DocumentTitle from 'react-document-title';

const DealPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const deal = useSelector((state) => state.deal.selectedDeal);

  useEffect(() => {
    dispatch(setSelectedDeal(null));
    dispatch(getCurrentDealById(id));
  }, []);

  const [dealModalVisible, setDealModalVisible] = useState(false);

  const handleCloseDeal = () => {
    dispatch(addNewPreviousDeal(deal)).then(() =>
      dispatch(removeCurrentDealById(id)).then(() => navigate('/deals'))
    );
  };

  return (
    <div>
      {deal && (
        <div>
          <DocumentTitle title={deal.title} />
          <h2>{deal.title}</h2>
          <h3>{deal.name}</h3>
          <p>{deal.phone}</p>
          <p>{deal.messeger}</p>
          <p>{deal.info}</p>
          <p>{deal.date}</p>
          <p>{deal.totalAmount}</p>
          <p>{deal.expenses}</p>
          <p>{deal.income}</p>
          <UpdateDealWindow
            show={dealModalVisible}
            onHide={() => setDealModalVisible(false)}
            currentTitle={deal.title}
            currentName={deal.name}
            currentPhone={deal.phone}
            currentMesseger={deal.messeger}
            currentInfo={deal.info}
            currentDate={deal.date}
            currentTotalAmount={deal.totalAmount}
            currentExpenses={deal.expenses}
          />
          <Button
            className='m-3'
            variant='outline-success'
            onClick={handleCloseDeal}>
            Закрыть сделку
          </Button>
          <Button
            className='m-3'
            variant='outline-info'
            onClick={() => setDealModalVisible(true)}>
            Редактировать
          </Button>
        </div>
      )}
    </div>
  );
};

export default DealPage;
