import { Dispatch } from "redux";
import { FETCH_USERS, User, UserActionTypes } from "../types/userTypes";

export const fetchUsers = () => {
  return async (dispatch: Dispatch<UserActionTypes>) => {
    try {
      const response = await fetch("/api/users");
      const users: User[] = await response.json();

      dispatch({
        type: FETCH_USERS,
        payload: users,
      });
    } catch (error) {
      console.error("Ошибка при получении пользователей:", error);
    }
  };
};
