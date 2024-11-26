import userReducer from "./userReducer"; // Импортируем редюсер
import {
  FETCH_USERS,
  User,
  UserActionTypes,
  FetchUsersAction,
} from "../types/userTypes"; // Импортируем типы действий

// Определяем тестовые данные
const mockUsers: User[] = [
  { id: "1", name: "Alice" },
  { id: "2", name: "Bob" },
];

describe("userReducer", () => {
  it("should return the initial state", () => {
    const initialState = { users: [] };
    const result = userReducer(undefined, {
      type: "",
    } as unknown as UserActionTypes);
    expect(result).toEqual(initialState);
  });

  it("should handle FETCH_USERS action", () => {
    const action: FetchUsersAction = {
      type: FETCH_USERS,
      payload: mockUsers,
    };
    const initialState = { users: [] };
    const result = userReducer(initialState, action);
    expect(result).toEqual({ users: mockUsers });
  });

  it("should not change state for unknown action type", () => {
    const action: UserActionTypes = {
      type: "UNKNOWN_ACTION",
    } as unknown as UserActionTypes;
    const initialState = { users: mockUsers };
    const result = userReducer(initialState, action);
    expect(result).toEqual(initialState); // Состояние должно остаться неизменным
  });
});
