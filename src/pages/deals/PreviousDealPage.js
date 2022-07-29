import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPreviousDealById, setSelectedDeal } from '../../redux/dealSlice';
import UpdateDealWindow from '../../components/modals/updateDealWindow';
import DocumentTitle from 'react-document-title';

const PreviousDealPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const deal = useSelector((state) => state.deal.selectedDeal);

  useEffect(() => {
    dispatch(setSelectedDeal(null));
    dispatch(getPreviousDealById(id));
  }, []);

  const [dealModalVisible, setDealModalVisible] = useState(false);

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
        </div>
      )}
    </div>
  );
};

export default PreviousDealPage;
