import api from './axios';

export const createGroup = async (groupData) => {
  return await api.post('/groups/create', groupData);
};
