import { initialState } from '@module/shared/reducers/app-reducers';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../shared/reducers';

const store = createStore(reducers, { appState: initialState }, applyMiddleware(thunk));

export default store;
