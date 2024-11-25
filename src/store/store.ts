import { createStore, combineReducers } from 'redux';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import userReducer from './reducers/userReducer';
import { messageReducer}  from './reducers/messageReducer';

// Объединяем редюсеры
const rootReducer = combineReducers({
  users: userReducer,
  messages: messageReducer,
});

// Определяем тип состояния всего приложения
export type RootState = ReturnType<typeof rootReducer>;

// Создаем Redux Store
const store = createStore(rootReducer);


// Создаем типизированный хук useSelector
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

// Экспортируем store по умолчанию
export default store;




