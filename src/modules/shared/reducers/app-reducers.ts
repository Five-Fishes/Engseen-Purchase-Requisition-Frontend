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

export const initialState: IAppState = {
  loading: false,
  loggedIn: !!localStorage.getItem('authority'),
  userGroup: localStorage.getItem('authority') ?? '',
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

export const logout = () => {
  localStorage.removeItem('authority');
  return {
    type: ACTION_TYPES.LOGOUT,
  };
};

export const login = (userGroup: string) => {
  localStorage.setItem('authority', userGroup);
  return {
    type: ACTION_TYPES.LOGIN,
    payload: {
      userGroup: userGroup,
    },
  };
};

export default appReducer;
