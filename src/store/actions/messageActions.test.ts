import {
    fetchMessages,
    fetchMessage,
    sendMessage,
    searchMessages,
  } from './messageActions';
  
  import {
    FETCH_MESSAGES,
    FETCH_MESSAGE,
    SEND_MESSAGE,
    SEARCH_MESSAGES,
  } from '../types/messageTypes';
  import { Message } from '../types/messageTypes'; 
  
  describe('Message Actions', () => {
    it('Событие при получении сообщений', () => {
      const messages: Message[] = [
        { id: 1, text: 'Hello', senderId: 1, timestamp: new Date() },
      ];
      const expectedAction = {
        type: FETCH_MESSAGES,
        payload: messages,
      };
      expect(fetchMessages(messages)).toEqual(expectedAction);
    });
  
    it('Событие при получении одного сообщения', () => {
      const message: Message = {
        id: 1,
        text: 'Hello',
        senderId: 1,
        timestamp: new Date(),
      };
      const expectedAction = {
        type: FETCH_MESSAGE,
        payload: message,
      };
      expect(fetchMessage(message)).toEqual(expectedAction);
    });
  
    it('Событие при отправке сообщений', () => {
      const message: Message = {
        id: 1,
        text: 'Hello',
        senderId: 1,
        timestamp: new Date(),
      };
      const expectedAction = {
        type: SEND_MESSAGE,
        payload: message,
      };
      expect(sendMessage(message)).toEqual(expectedAction);
    });
  
    it('Событие при поиске сообщений', () => {
      const query = 'Hello';
      const expectedAction = {
        type: SEARCH_MESSAGES,
        payload: query,
      };
      expect(searchMessages(query)).toEqual(expectedAction);
    });
  });
  