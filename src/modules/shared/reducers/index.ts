import { combineReducers } from 'redux';
import appReducer, { IAppState } from './app-reducers';

export interface IRootState {
  readonly appState: IAppState,
}

const rootReducer = combineReducers({
  appState: appReducer
});

export default rootReducer;