import { $authHost, $host } from './index';
import jwt_decode from 'jwt-decode';

export const fetchContacts = async (page, limit) => {
  let userId = localStorage.getItem('userId');
  const { data } = await $authHost.get('api/contact', {
    params: {
      page,
      limit,
      userId,
    },
  });
  return data;
};

export const createContact = async (contact) => {
  const { data } = await $authHost.post('api/contact', contact);
  return data;
};

export const fetchSingleContact = async (id) => {
  const { data } = await $authHost.get('api/contact/' + id);
  return data;
};

export const removeContact = async (id) => {
  await $authHost.post('api/contact/' + id);
  return id;
};

export const updateContact = async (contact) => {
  const id = contact.id;
  const { data } = await $authHost.put('api/contact/' + id, contact);
  return data[1][0];
};
