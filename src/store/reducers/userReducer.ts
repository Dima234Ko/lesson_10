import { FETCH_USERS, User, UserActionTypes } from '../types/userTypes';

interface UserState {
  users: User[];
}

const initialState: UserState = {
  users: [],
};

const userReducer = (state = initialState, action: UserActionTypes): UserState => {
  switch (action.type) {
    case FETCH_USERS:
      return { ...state, users: action.payload };
    default:
      return state;
  }
};

export default userReducer;
