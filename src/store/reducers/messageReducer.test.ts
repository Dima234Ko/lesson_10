import messageReducer from './messageReducer'; // Путь к вашему редьюсеру
import {
  FETCH_MESSAGES,
  FETCH_MESSAGE,
  SEND_MESSAGE,
  SEARCH_MESSAGES,
  Message,
  MessageActionTypes,
  FetchMessagesAction,
  FetchMessageAction,
  SendMessageAction,
  SearchMessagesAction
} from '../types/messageTypes'; // Путь к вашим типам


const mockMessages: Message[] = [
  { id: 1, text: 'Привет мир', senderId: 1, timestamp: new Date() },
  { id: 2, text: 'Тестирование функций', senderId: 2, timestamp: new Date() },
];

describe('messageReducer', () => {
  it('Возврат исходного состояния', () => {
    expect(messageReducer(undefined, {} as MessageActionTypes)).toEqual({
      messages: [],
      currentMessage: null,
      searchResults: [],
    });
  });

  it('Тест редьюсера FETCH_MESSAGES при загрузке одного сообщения', () => {
    const action: FetchMessagesAction = {
      type: FETCH_MESSAGES,
      payload: mockMessages,
    };
  
    const expectedState = {
      messages: mockMessages,
      currentMessage: null,
      searchResults: [],
    };
  
    expect(messageReducer(undefined, action)).toEqual(expectedState);
  });  

  it('Тест редьюсера FETCH_MESSAGES при загрузке массива сообщений', () => {
    const action: FetchMessageAction = {
      type: FETCH_MESSAGE,
      payload: mockMessages[0],
    };
  
    const initialState = {
      messages: [],
      currentMessage: null,
      searchResults: [],
    };
  
    const expectedState = {
      messages: [],
      currentMessage: mockMessages[0],
      searchResults: [],
    };
  
    expect(messageReducer(initialState, action)).toEqual(expectedState);
  });
  
  it('should handle SEND_MESSAGE', () => {
    const action: SendMessageAction = {
      type: SEND_MESSAGE,
      payload: mockMessages[1],
    };
  
    const initialState = {
      messages: [],
      currentMessage: null,
      searchResults: [],
    };
  
    const expectedState = {
      messages: [mockMessages[1]],
      currentMessage: null,
      searchResults: [],
    };
  
    expect(messageReducer(initialState, action)).toEqual(expectedState);
  });
  
  it('should handle SEARCH_MESSAGES', () => {
    const initialState = {
      messages: mockMessages,
      currentMessage: null,
      searchResults: [],
    };
  
    const action: SearchMessagesAction = {
      type: SEARCH_MESSAGES,
      payload: 'Привет',
    };
  
    const expectedState = {
      messages: mockMessages,
      currentMessage: null,
      searchResults: [mockMessages[0]], 
    };
  
    expect(messageReducer(initialState, action)).toEqual(expectedState);
  });
  
});
