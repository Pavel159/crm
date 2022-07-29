import { $authHost, $host } from '../index';
import jwt_decode from 'jwt-decode';

export const fetchCurrentDealsByUser = async (page, limit) => {
  let userId = localStorage.getItem('userId');
  console.log(userId);
  const { data } = await $authHost.get('api/current_deal/by_user', {
    params: {
      page,
      limit,
      userId,
    },
  });
  return data;
};

export const fetchCurrentDealsByContact = async (page, limit) => {
  let contactId = localStorage.getItem('contactId');
  const { data } = await $authHost.get('api/current_deal/by_contact', {
    params: {
      page,
      limit,
      contactId,
    },
  });
  return data;
};

export const createCurrentDeal = async (deal) => {
  const { data } = await $authHost.post('api/current_deal', deal);
  return data;
};

export const fetchSingleCurrentDeal = async (id) => {
  const { data } = await $authHost.get('api/current_deal/' + id);
  return data;
};

export const removeCurrentDeal = async (id) => {
  await $authHost.post('api/current_deal/' + id);
  return id;
};

export const updateCurrentDeal = async (deal) => {
  const id = deal.id;
  const { data } = await $authHost.put('api/current_deal/' + id, deal);
  return data[1][0];
};
