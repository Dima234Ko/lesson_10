import { Dispatch } from 'redux';
import { FETCH_USERS, User, UserActionTypes } from '../types/userTypes';

// Асинхронное действие для получения списка пользователей
export const fetchUsers = () => {
  return async (dispatch: Dispatch<UserActionTypes>) => {
    try {
      const response = await fetch('/api/users'); // Замените на ваш URL API
      const users: User[] = await response.json();

      // Диспатчим действие с полученными пользователями
      dispatch({
        type: FETCH_USERS,
        payload: users,
      });
    } catch (error) {
      console.error('Ошибка при получении пользователей:', error);
      // Здесь можно также диспатчить действие для обработки ошибок, если это необходимо
    }
  };
};
