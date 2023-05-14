import { createReducer, on } from "@ngrx/store";
import { DBUser } from "../interfaces/user.interface";
import { clearUser, setUser } from "./auth.actions";

export interface AuthState {
  user: DBUser | null
}

const initialState: AuthState = {
  user: getInitialValue()
};

function getInitialValue() {
  const user = localStorage.getItem('USER_REDUX');

  if (!user) return null;
  return JSON.parse(user);
}

export const AuthReducer = createReducer(
  initialState,
  on(setUser, (state: AuthState, { user }): AuthState => {
    const newState = structuredClone({...state});
    localStorage.setItem('USER_REDUX', JSON.stringify(user));
    return {...newState, user: user};
  }),
  on(clearUser, (state: AuthState) => {
    const newState = structuredClone({...state, user: null});
    localStorage.removeItem('USER_REDUX');
    return newState;
  })
)
