import { AnyAction } from 'redux';
export interface IAppState {
  loading: boolean;
  loggedIn: boolean;
  userGroup: String;
}

export const ACTION_TYPES = {
  SET_LOADING: 'app/SET_LOADING',
  LOGOUT: 'app/LOGOUT',
  LOGIN: 'app/LOGIN',
};

const initialState: IAppState = {
  loading: false,
  loggedIn: false,
  userGroup: '',
};

// Reducer
const appReducer = (state: IAppState = initialState, action: AnyAction): IAppState => {
  console.log(action);
  switch (action.type) {
    case ACTION_TYPES.SET_LOADING:
      const { loading } = action.payload;
      console.log(loading);
      return {
        ...state,
        loading: loading,
      };
    case ACTION_TYPES.LOGOUT:
      return {
        ...state,
        loggedIn: false,
      };
    case ACTION_TYPES.LOGIN:
      return {
        ...state,
        loggedIn: true,
        userGroup: action.userGroup,
      };
    default:
      return state;
  }
};

// actions
export const setLoading = (isLoading: Boolean) => ({
  type: ACTION_TYPES.SET_LOADING,
  payload: {
    loading: isLoading,
  },
});

export const logout = () => ({
  type: ACTION_TYPES.LOGOUT,
});

export const login = (userGroup: String) => ({
  type: ACTION_TYPES.LOGIN,
  payload: {
    userGroup: userGroup,
  },
});

export default appReducer;
