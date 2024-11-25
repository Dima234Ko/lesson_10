import store from './store'; // Импортируем только store
import { Store } from 'redux'; 
import {
  FETCH_MESSAGES,
  FETCH_MESSAGE,
  SEND_MESSAGE,
  SEARCH_MESSAGES,
  Message,
  MessageActionTypes,
  MessageState
} from './types/messageTypes'; 

import {
    FETCH_USERS,
    User,
    UserState,
    FetchUsersAction
  } from './types/userTypes';



// Определяем тип состояния
interface RootState {
  users: UserState;
  messages: MessageState;
}

// Определяем типы действий
type AppActions = FetchUsersAction | MessageActionTypes;

describe('Redux Store', () => {
  let testStore: Store<RootState, AppActions>; // Указываем правильный тип Store

  beforeEach(() => {
    testStore = store; // Используем уже созданный store
  });

  it('should return the initial state', () => {
    const state = testStore.getState();
    expect(state).toEqual({
      users: { users: [] },
      messages: { messages: [], currentMessage: null, searchResults: [] },
    });
  });

  it('should handle FETCH_USERS action', () => {
    const users: User[] = [
      { id: '1', name: 'Alice' },
      { id: '2', name: 'Bob' },
    ];
    testStore.dispatch({ type: FETCH_USERS, payload: users } as FetchUsersAction);
    const state = testStore.getState();
    expect(state.users.users).toEqual(users);
  });

  it('should handle FETCH_MESSAGES action', () => {
    const messages: Message[] = [
      { id: 1, text: 'Hello', senderId: 1, timestamp: new Date() },
      { id: 2, text: 'World', senderId: 2, timestamp: new Date() },
    ];
    testStore.dispatch({ type: FETCH_MESSAGES, payload: messages } as MessageActionTypes);
    const state = testStore.getState();
    expect(state.messages.messages).toEqual(messages);
  });

  it('should handle FETCH_MESSAGE action', () => {
    const message: Message = { id: 1, text: 'Hello', senderId: 1, timestamp: new Date() };
    testStore.dispatch({ type: FETCH_MESSAGE, payload: message } as MessageActionTypes);
    const state = testStore.getState();
    expect(state.messages.currentMessage).toEqual(message);
  });

  it('should handle SEND_MESSAGE action', () => {
    const message: Message = { id: 1, text: 'Hello', senderId: 1, timestamp: new Date() };
    testStore.dispatch({ type: SEND_MESSAGE, payload: message } as MessageActionTypes);
    const state = testStore.getState();
    expect(state.messages.messages).toContainEqual(message);
  });

  it('should handle SEARCH_MESSAGES action', () => {
    const message1: Message = { id: 1, text: 'Hello world', senderId: 1, timestamp: new Date() };
    const message2: Message = { id: 2, text: 'Goodbye world', senderId: 2, timestamp: new Date() };

    testStore.dispatch({ type: FETCH_MESSAGES, payload: [message1, message2] } as MessageActionTypes);
    
    testStore.dispatch({ type: SEARCH_MESSAGES, payload: 'world' } as MessageActionTypes);
    const state = testStore.getState();
    expect(state.messages.searchResults).toEqual([message1, message2]);
  });
});
