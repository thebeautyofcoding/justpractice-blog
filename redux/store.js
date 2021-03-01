import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import logger from 'redux-logger';

import rootReducer from './root-reducer';
import { composeWithDevTools } from 'redux-devtools-extension';

let middlewares = [logger, thunk]


const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)))


export default store;