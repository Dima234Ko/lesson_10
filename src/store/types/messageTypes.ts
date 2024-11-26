// messageTypes.ts

export const FETCH_MESSAGES = "FETCH_MESSAGES";
export const FETCH_MESSAGE = "FETCH_MESSAGE";
export const SEND_MESSAGE = "SEND_MESSAGE";
export const SEARCH_MESSAGES = "SEARCH_MESSAGES";

export interface Message {
  id: number;
  text: string;
  senderId: number;
  timestamp: Date;
}

export interface MessageState {
  messages: Message[];
  currentMessage: Message | null;
  searchResults: Message[];
}

export interface FetchMessagesAction {
  type: typeof FETCH_MESSAGES;
  payload: Message[];
}

export interface FetchMessageAction {
  type: typeof FETCH_MESSAGE;
  payload: Message;
}

export interface SendMessageAction {
  type: typeof SEND_MESSAGE;
  payload: Message;
}

export interface SearchMessagesAction {
  type: typeof SEARCH_MESSAGES;
  payload: string;
}

export type MessageActionTypes =
  | FetchMessagesAction
  | FetchMessageAction
  | SendMessageAction
  | SearchMessagesAction;
