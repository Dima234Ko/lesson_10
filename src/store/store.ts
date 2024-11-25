import { createStore, combineReducers } from 'redux';
import messageReducer from './reducers/messageReducer';
import userReducer from './reducers/userReducer';

const rootReducer = combineReducers({
  messages: messageReducer,
  users: userReducer,
});

const store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;
export default store;
