import {
    FETCH_MESSAGES,
    FETCH_MESSAGE,
    SEND_MESSAGE,
    SEARCH_MESSAGES,
    MessageActionTypes,
    Message,
  } from '../types/messageTypes';
  
  interface MessageState {
    messages: Message[];
    currentMessage: Message | null;
    searchResults: Message[];
  }
  
  const initialState: MessageState = {
    messages: [],
    currentMessage: null,
    searchResults: [],
  };
  
  const messageReducer = (state = initialState, action: MessageActionTypes): MessageState => {
    switch (action.type) {
      case FETCH_MESSAGES:
        return { ...state, messages: action.payload };
      case FETCH_MESSAGE:
        return { ...state, currentMessage: action.payload };
      case SEND_MESSAGE:
        return { ...state, messages: [...state.messages, action.payload] };
      case SEARCH_MESSAGES:
        return {
          ...state,
          searchResults: state.messages.filter((message) =>
            message.text.includes(action.payload)
          ),
        };
      default:
        return state;
    }
  };
  
  export default messageReducer;
  