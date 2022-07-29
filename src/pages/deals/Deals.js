import React, { useEffect, useState } from 'react';
import DocumentTitle from 'react-document-title';
import { useDispatch, useSelector } from 'react-redux';
import SingleDeal from '../../components/deals/SingleDeal';
import SinglePreviousDeal from '../../components/deals/SinglePreviousDeal';
import {
  getCurrentDealsByUser,
  getPreviousDealsByUser,
} from '../../redux/dealSlice';

const Deals = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentDealsByUser());
    dispatch(getPreviousDealsByUser());
  }, []);
  const currentDeals = useSelector((state) => state.deal.currentDeals);
  const sortedCurrentDeals = currentDeals.slice().sort((a, b) => b.id - a.id);

  const previousDeals = useSelector((state) => state.deal.previousDeals);
  const sortedPreviousDeals = previousDeals.slice().sort((a, b) => b.id - a.id);

  return (
    <div>
      <DocumentTitle title='Сделки' />
      <h1 style={{ textAlign: 'center' }}>Сделки</h1>
      <h2>Текущие:</h2>
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
      <h2>Закрытые:</h2>
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
  );
};

export default Deals;
