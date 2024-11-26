import { createStore, combineReducers } from "redux";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import userReducer from "./reducers/userReducer";
import { messageReducer } from "./reducers/messageReducer";
import { MessageState } from "./types/messageTypes";
//import { createStore, combineReducers, applyMiddleware } from 'redux';
//import thunk from 'redux-thunk';
//import { messageReducer, newMessageReducer } from "./reducers/messageReducer";

const rootReducer = combineReducers({
  users: userReducer,
  messages: messageReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

// const enhancer = applyMiddleware(thunk)
// const store = createStore(rootReducer, enhancer);Ф

const store = createStore(rootReducer);
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

const replaceMessageReducer = (newMessageReducer: MessageState) => {
  const newRootReducer = combineReducers({
    users: userReducer,
    messages: newMessageReducer,
  });

  store.replaceReducer(newRootReducer);
};

export { store, replaceMessageReducer };
