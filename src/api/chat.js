import api from './axios';

export const sendChatMessage = async (message, address, context) => {
  return await api.post('/ai/chat', { message, address, context });
};
