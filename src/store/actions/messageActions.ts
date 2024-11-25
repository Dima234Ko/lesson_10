import {
    FETCH_MESSAGES,
    FETCH_MESSAGE,
    SEND_MESSAGE,
    SEARCH_MESSAGES,
    Message,
    MessageActionTypes,
  } from '../types/messageTypes';

  
  // Получение списка сообщений
  export const fetchMessages = (messages: Message[]): MessageActionTypes => ({
    type: FETCH_MESSAGES,
    payload: messages,
  });
  
  // Получение одного сообщения
  export const fetchMessage = (message: Message): MessageActionTypes => ({
    type: FETCH_MESSAGE,
    payload: message,
  });
  
  // Отправка сообщения
  export const sendMessage = (message: Message): MessageActionTypes => ({
    type: SEND_MESSAGE,
    payload: message,
  });
  
  // Поиск по сообщениям
  export const searchMessages = (query: string): MessageActionTypes => ({
    type: SEARCH_MESSAGES,
    payload: query,
  });
  