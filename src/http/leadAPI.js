import { $authHost, $host } from './index';
import jwt_decode from 'jwt-decode';

export const fetchLeads = async (page, limit) => {
  let userId = localStorage.getItem('userId');
  console.log(userId);
  const { data } = await $authHost.get('api/lead', {
    params: {
      page,
      limit,
      userId,
    },
  });
  console.log(data);
  return data;
};

export const createLead = async (lead) => {
  const { data } = await $authHost.post('api/lead', lead);
  return data;
};

export const fetchSingleLead = async (id) => {
  const { data } = await $authHost.get('api/lead/' + id);
  return data;
};

export const removeLead = async (id) => {
  await $authHost.post('api/lead/' + id);
  return id;
};

export const updateLead = async (lead) => {
  const id = lead.id;
  const { data } = await $authHost.put('api/lead/' + id, lead);
  return data[1][0];
};
