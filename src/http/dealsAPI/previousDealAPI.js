import { $authHost, $host } from '../index';
import jwt_decode from 'jwt-decode';

export const fetchPreviousDealsByUser = async (page, limit) => {
  let userId = localStorage.getItem('userId');
  const { data } = await $authHost.get('api/previous_deal/by_user', {
    params: {
      page,
      limit,
      userId,
    },
  });

  return data;
};

export const fetchPreviousDealsByContact = async (page, limit) => {
  let contactId = localStorage.getItem('contactId');
  const { data } = await $authHost.get('api/previous_deal/by_contact', {
    params: {
      page,
      limit,
      contactId,
    },
  });

  return data;
};

export const fetchPreviousDealsForReport = async (id) => {
  let contactId = id;
  const { data } = await $authHost.get('api/previous_deal/by_contact', {
    params: {
      contactId,
    },
  });

  return data;
};

export const createPreviousDeal = async (deal) => {
  const { data } = await $authHost.post('api/previous_deal', deal);
  return data;
};

export const fetchSinglePreviousDeal = async (id) => {
  const { data } = await $authHost.get('api/previous_deal/' + id);
  return data;
};

export const removePreviousDeal = async (id) => {
  await $authHost.post('api/previous_deal/' + id);
  return id;
};
