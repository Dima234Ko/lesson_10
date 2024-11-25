export const FETCH_USERS = 'FETCH_USERS';

export interface User {
  id: string;
  name: string;
}

export interface FetchUsersAction {
  type: typeof FETCH_USERS;
  payload: User[];
}

export type UserActionTypes = FetchUsersAction;


export interface UserState {
  users: User[];
}

